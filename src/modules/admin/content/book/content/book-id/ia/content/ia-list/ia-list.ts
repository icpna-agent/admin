import { Component, signal, inject, OnInit, OnDestroy, input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { environment } from '@environment/environment';
import { ToastService } from '@service/toast.service';

interface CapturedPage {
  domPage: number;
  realPage: number;
  fileName: string;
  base64: string;
  dataUrl: string;
}

@Component({
  selector: 'app-ia-list',
  imports: [CommonModule, FormsModule, BookTabs],
  templateUrl: './ia-list.html',
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(156, 163, 175, 0.3);
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(156, 163, 175, 0.5);
    }
    [data-theme='dark'] .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(156, 163, 175, 0.2);
    }
    [data-theme='dark'] .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(156, 163, 175, 0.4);
    }
  `]
})
export class IaList implements OnInit, OnDestroy {
  private toastService = inject(ToastService);

  bookId = input<string>();

  // Form Fields
  bookUrl = signal('https://duxebhp63ladi.cloudfront.net/americanbigpicture/flipbook/b1p/abp8b1p_sb/index.html');
  startDomPage = signal(5);
  endDomPage = signal(48);
  pageOffset = signal(4);
  showAdvanced = signal(false);

  // Status Signals
  loading = signal(false);
  progress = signal(0);
  statusText = signal('');
  capturedPages = signal<CapturedPage[]>([]);
  
  // Modal State Signals
  selectedPage = signal<CapturedPage | null>(null);
  selectedPageIndex = signal<number>(-1);

  private eventSource: EventSource | null = null;

  ngOnInit() {
    // Si hay datos pre-cargados que necesiten inicializarse, se hace aquí
  }

  ngOnDestroy() {
    this.stopEventSource();
  }

  private getAccessToken(): string {
    if (typeof window === 'undefined') return '';
    const session = localStorage.getItem('user_session');
    return session ? JSON.parse(session).accessToken : '';
  }

  startCapture() {
    if (this.startDomPage() > this.endDomPage()) {
      this.toastService.error('La página de inicio no puede ser mayor que la de fin.');
      return;
    }

    this.stopEventSource();
    this.capturedPages.set([]);
    this.progress.set(0);
    this.loading.set(true);
    this.statusText.set('Conectando con el servicio de digitalización de IA...');

    const token = this.getAccessToken();
    const queryParams = new URLSearchParams({
      token,
      startDomPage: this.startDomPage().toString(),
      endDomPage: this.endDomPage().toString(),
      pageOffset: this.pageOffset().toString(),
      bookUrl: this.bookUrl(),
    });

    const url = `${environment.baseUrl}/admin/book-auto/american-big-picture?${queryParams.toString()}`;

    try {
      this.eventSource = new EventSource(url);

      this.eventSource.addEventListener('start', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          this.statusText.set(`Conexión establecida. Preparando captura de ${data.totalPages} páginas...`);
        } catch (e) {
          this.statusText.set('Proceso iniciado en el servidor...');
        }
      });

      this.eventSource.addEventListener('page', (event: any) => {
        try {
          const data = JSON.parse(event.data);
          const dataUrl = `data:image/jpeg;base64,${data.base64}`;
          const newPage: CapturedPage = {
            domPage: data.domPage,
            realPage: data.realPage,
            fileName: data.fileName,
            base64: data.base64,
            dataUrl,
          };
          this.capturedPages.update((pages) => [...pages, newPage]);
          this.progress.set(data.progress);
          this.statusText.set(`Página real ${data.realPage} capturada con éxito (DOM ${data.domPage})`);
        } catch (e) {
          console.error('Error parsing page event:', e);
        }
      });

      this.eventSource.addEventListener('complete', (event: any) => {
        this.statusText.set('Captura de libro finalizada con éxito.');
        this.toastService.success('¡Digitalización completada!');
        this.stopEventSource();
      });

      this.eventSource.addEventListener('error', (event: any) => {
        console.error('EventSource Error event:', event);
        // Si el estado ya es complete o cancelado, ignoramos el evento de cierre de EventSource que lanza error al desconectar
        if (this.loading()) {
          this.statusText.set('Error o desconexión en el proceso de digitalización.');
          this.toastService.error('Se interrumpió el proceso de captura.');
          this.stopEventSource();
        }
      });
    } catch (err) {
      console.error('EventSource connection error:', err);
      this.statusText.set('No se pudo establecer conexión con el servidor.');
      this.loading.set(false);
    }
  }

  stopCapture() {
    this.statusText.set('Proceso detenido por el usuario.');
    this.toastService.warning('Captura cancelada');
    this.stopEventSource();
  }

  private stopEventSource() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.loading.set(false);
  }

  openModal(page: CapturedPage) {
    this.selectedPage.set(page);
    const index = this.capturedPages().findIndex((p) => p.fileName === page.fileName);
    this.selectedPageIndex.set(index);
  }

  closeModal() {
    this.selectedPage.set(null);
    this.selectedPageIndex.set(-1);
  }

  nextPage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const pages = this.capturedPages();
    if (pages.length === 0) return;
    const nextIndex = (this.selectedPageIndex() + 1) % pages.length;
    this.selectedPageIndex.set(nextIndex);
    this.selectedPage.set(pages[nextIndex]);
  }

  prevPage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const pages = this.capturedPages();
    if (pages.length === 0) return;
    const prevIndex = (this.selectedPageIndex() - 1 + pages.length) % pages.length;
    this.selectedPageIndex.set(prevIndex);
    this.selectedPage.set(pages[prevIndex]);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (!this.selectedPage()) return;
    if (event.key === 'Escape') {
      this.closeModal();
    } else if (event.key === 'ArrowRight') {
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      this.prevPage();
    }
  }
}
