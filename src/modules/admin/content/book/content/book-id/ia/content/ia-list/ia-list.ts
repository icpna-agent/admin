import { Component, signal, inject, OnDestroy, input, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { environment } from '@environment/environment';
import { ToastService } from '@service/toast.service';
import { BookService } from '@service/book.service';

interface CapturedPage {
  domPage: number;
  realPage: number;
  fileName: string;
  base64: string;
  dataUrl: string;
  hasAudio?: boolean;
  badges: string[];
  status?: 'waiting' | 'processing' | 'completed' | 'failed';
  statusText?: string;
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
export class IaList implements OnDestroy {
  private toastService = inject(ToastService);
  private bookService = inject(BookService);

  bookId = input<string>();
  private activeBookId: string | undefined;

  // Form Fields
  bookUrl = signal('');
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

  // Registration Signals
  isRegistering = signal(false);

  private eventSource: EventSource | null = null;
  private processingQueue: string[] = [];
  private isProcessing = false;

  constructor() {
    effect(() => {
      const bookId = this.bookId();
      if (!bookId || bookId === this.activeBookId) return;
      this.activeBookId = bookId;
      this.stopEventSource();
      this.bookUrl.set('');
      this.capturedPages.set([]);
      this.selectedPage.set(null);
      this.selectedPageIndex.set(-1);
      this.progress.set(0);
      this.statusText.set('');
      this.loading.set(false);
      this.loadBook();
    });
  }

  loadBook() {
    if (this.bookId()) {
      this.bookService.findOneBook(+this.bookId()!).then(book => {
        if (book && book.urlPreview) {
          this.bookUrl.set(book.urlPreview);
        }
      }).catch(err => {
        console.error('Error al cargar datos del libro:', err);
      });
    }
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
    this.processingQueue = [];
    this.isProcessing = false;

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

      this.eventSource.addEventListener('start', (event: Event) => {
        try {
          const messageEvent = event as MessageEvent;
          const data = JSON.parse(messageEvent.data as string);
          this.statusText.set(`Conexión establecida. Preparando captura de ${data.totalPages} páginas...`);
        } catch (e) {
          this.statusText.set('Proceso iniciado en el servidor...');
        }
      });

      this.eventSource.addEventListener('page', (event: Event) => {
        try {
          const messageEvent = event as MessageEvent;
          const data = JSON.parse(messageEvent.data as string);
          const dataUrl = `data:image/jpeg;base64,${data.base64}`;
          
          const initialBadges: string[] = [];
          if ((data.realPage as number) === 1) {
            initialBadges.push('index', 'unit');
          } else if ((data.realPage as number) >= 2 && (data.realPage as number) <= 31) {
            initialBadges.push('lesson', 'panel');
          }
          if (data.hasAudio as boolean) {
            initialBadges.push('audio');
          }

          const newPage: CapturedPage = {
            domPage: data.domPage as number,
            realPage: data.realPage as number,
            fileName: data.fileName as string,
            base64: data.base64 as string,
            dataUrl,
            hasAudio: data.hasAudio as boolean | undefined,
            badges: initialBadges,
          };
          this.capturedPages.update((pages) => [...pages, newPage]);
          this.progress.set(data.progress as number);
          this.statusText.set(`Página real ${data.realPage} capturada con éxito (DOM ${data.domPage})`);
        } catch (e) {
          console.error('Error parsing page event:', e);
        }
      });

      this.eventSource.addEventListener('complete', (event: Event) => {
        this.statusText.set('Captura de libro finalizada con éxito.');
        this.toastService.success('¡Digitalización completada!');
        this.stopEventSource();
      });

      this.eventSource.addEventListener('error', (event: Event) => {
        console.error('EventSource Error event:', event);
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

  removeBadge(page: CapturedPage, badge: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.capturedPages.update(pages => 
      pages.map(p => {
        if (p.fileName === page.fileName) {
          const updatedBadges = p.badges.filter((b: string) => b !== badge);
          const updatedPage = { 
            ...p, 
            badges: updatedBadges,
            hasAudio: badge === 'audio' ? false : p.hasAudio
          };
          const selected = this.selectedPage();
          if (selected && selected.fileName === page.fileName) {
            this.selectedPage.set(updatedPage);
          }
          return updatedPage;
        }
        return p;
      })
    );
  }

  addBadge(page: CapturedPage, badge: string) {
    if (!badge) return;
    this.capturedPages.update(pages =>
      pages.map(p => {
        if (p.fileName === page.fileName) {
          if (p.badges.includes(badge)) return p;
          const updatedBadges = [...p.badges, badge];
          const updatedPage = {
            ...p,
            badges: updatedBadges,
            hasAudio: badge === 'audio' ? true : p.hasAudio
          };
          const selected = this.selectedPage();
          if (selected && selected.fileName === page.fileName) {
            this.selectedPage.set(updatedPage);
          }
          return updatedPage;
        }
        return p;
      })
    );
  }

  onBadgeSelectChange(event: Event, page: CapturedPage) {
    const select = event.target as HTMLSelectElement;
    const badge = select.value;
    if (badge) {
      this.addBadge(page, badge);
      select.value = ''; // Reset select to placeholder
    }
  }

  private updatePageStatus(fileName: string, status: 'waiting' | 'processing' | 'completed' | 'failed', statusText: string) {
    this.capturedPages.update(pages =>
      pages.map(p => {
        if (p.fileName === fileName) {
          const updatedPage = { ...p, status, statusText };
          const selected = this.selectedPage();
          if (selected && selected.fileName === fileName) {
            this.selectedPage.set(updatedPage);
          }
          return updatedPage;
        }
        return p;
      })
    );
  }

  registerAllData() {
    if (this.isRegistering() || this.capturedPages().length === 0) return;
    this.isRegistering.set(true);

    // Set all captured pages to 'waiting' state
    this.capturedPages.update(pages =>
      pages.map(p => ({
        ...p,
        status: 'waiting',
        statusText: 'Esperando turno...'
      }))
    );

    // Populate processing queue
    this.processingQueue = this.capturedPages().map(p => p.fileName);
    this.processNextInQueue();
  }

  async processNextInQueue() {
    if (this.processingQueue.length === 0) {
      this.isRegistering.set(false);
      this.isProcessing = false;
      return;
    }
    if (this.isProcessing) return;
    this.isProcessing = true;

    const nextFileName = this.processingQueue.shift();
    if (nextFileName) {
      const page = this.capturedPages().find(p => p.fileName === nextFileName);
      if (page) {
        await this.processPageIa(page);
      }
    }

    this.isProcessing = false;
    this.processNextInQueue();
  }

  async processPageIa(page: CapturedPage) {
    this.updatePageStatus(page.fileName, 'processing', 'Iniciando...');

    const token = this.getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = {
      bookId: Number(this.bookId() || 1),
      bookPage: page.realPage,
      image: page.base64,
      badges: page.badges
    };

    try {
      const response = await fetch(`${environment.baseUrl}/admin/book-auto/insert-ia`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No se pudo establecer el canal de lectura del stream.');
      }

      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          if (trimmed.startsWith('data:')) {
            try {
              const dataStr = trimmed.slice(5).trim();
              const parsed = JSON.parse(dataStr);
              if (parsed.message) {
                this.updatePageStatus(page.fileName, 'processing', parsed.message);
              }
            } catch (e) {
              // Ignorar errores de parseo de datos parciales
            }
          }
        }
      }

      this.updatePageStatus(page.fileName, 'completed', 'Procesado con éxito');
    } catch (error: unknown) {
      console.error('Error processing page IA:', error);
      const errMsg = error instanceof Error ? error.message : 'Error desconocido';
      this.updatePageStatus(page.fileName, 'failed', errMsg);
    }
  }

  retryPageIa(page: CapturedPage, event: Event) {
    event.stopPropagation();
    this.capturedPages.update(pages =>
      pages.map(p => {
        if (p.fileName === page.fileName) {
          return { ...p, status: 'waiting', statusText: 'Esperando turno...' };
        }
        return p;
      })
    );
    this.processingQueue.push(page.fileName);
    this.processNextInQueue();
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
