import { Component, signal, inject, OnInit, viewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../../../../components/modal-form/modal-form';
import { AudioForm } from '../../layout/audio-form/audio-form';
import { PaginationComponent } from '@module/admin/components/pagination/pagination';

@Component({
  selector: 'app-audio-list',
  imports: [CommonModule, ModalForm, BookTabs, AudioForm, PaginationComponent],
  templateUrl: './audio-list.html',
})
export class AudioList implements OnInit {
  private bookService = inject(BookService);
  private toastService = inject(ToastService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  bookId = input<string>();

  items = signal<any[]>([]);
  loading = signal(false);
  showModal = signal(false);
  searchQuery = signal('');
  private searchTimeout: any;

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  meta = signal<any | null>(null);

  // Zoom Modal
  zoomContent = signal<string | null>(null);
  zoomTitle = signal<string>('');

  openZoom(title: string, content: string) {
    this.zoomTitle.set(title);
    this.zoomContent.set(content);
  }

  closeZoom() {
    this.zoomContent.set(null);
  }

  showUrlsModal = signal(false);
  loadingAllAudios = signal(false);
  allAudios = signal<any[]>([]);

  openUrlsModal() {
    this.showUrlsModal.set(true);
    this.loadingAllAudios.set(true);
    
    const query = {
      bookId: +this.bookId()!,
      limit: 100,
      page: 1
    };

    this.bookService.list('audios', query).then((res: any) => {
      const data = res && res.data ? res.data : (Array.isArray(res) ? res : []);
      const sorted = [...data].sort((a, b) => {
        return a.audioIndex.localeCompare(b.audioIndex, undefined, { numeric: true, sensitivity: 'base' });
      });
      this.allAudios.set(sorted);
      this.loadingAllAudios.set(false);
    }).catch(() => {
      this.toastService.error('Error al cargar la lista completa de audios');
      this.loadingAllAudios.set(false);
    });
  }

  closeUrlsModal() {
    this.showUrlsModal.set(false);
    this.loadItems();
  }

  onUrlInput(item: any, value: string) {
    this.allAudios.update(items =>
      items.map(i => i.id === item.id ? { ...i, url: value } : i)
    );
  }

  clearAudioUrl(item: any, inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.allAudios.update(items =>
      items.map(i => i.id === item.id ? { ...i, url: '' } : i)
    );
    inputElement.focus();
  }

  uploadToMeta(item: any) {
    if (!item.url || item.url.trim() === '') {
      return;
    }

    this.allAudios.update(items =>
      items.map(i => i.id === item.id ? { ...i, uploading: true } : i)
    );

    // 1. Guardar la URL del audio en base de datos primero
    this.bookService.update('audios', item.id, { url: item.url }).then(() => {
      // 2. Guardar en Azure
      this.bookService.uploadAudioUrlToMeta(item.url).then((uploadRes: any) => {
        const stableAudioUrl = uploadRes.url || item.url;
        
        // 3. Transcribir el audio
        this.bookService.transcribeAudio(stableAudioUrl).then((transcribeRes: any) => {
          const text = transcribeRes.transcription;
          
          // 4. Guardar URL estable y la transcripción en base de datos
          this.bookService.update('audios', item.id, { url: stableAudioUrl, metaMediaId: null, transcription: text }).then(() => {
            this.allAudios.update(items =>
              items.map(i => i.id === item.id ? { ...i, url: stableAudioUrl, metaMediaId: null, transcription: text, uploading: false } : i)
            );
            this.toastService.success(`Audio ${item.audioIndex} guardado y transcrito con éxito`);
          }).catch(err => {
            this.allAudios.update(items =>
              items.map(i => i.id === item.id ? { ...i, uploading: false } : i)
            );
            this.toastService.error('Error al guardar datos procesados: ' + this.bookService.getErrorMessage(err));
          });
        }).catch(err => {
          // En caso la transcripción falle, intentamos guardar al menos la URL estable
          this.bookService.update('audios', item.id, { url: stableAudioUrl, metaMediaId: null }).then(() => {
            this.allAudios.update(items =>
              items.map(i => i.id === item.id ? { ...i, url: stableAudioUrl, metaMediaId: null, uploading: false } : i)
            );
            this.toastService.warning('Audio guardado en Azure, pero falló la transcripción');
          }).catch(dbErr => {
            this.allAudios.update(items =>
              items.map(i => i.id === item.id ? { ...i, uploading: false } : i)
            );
            this.toastService.error('Error al guardar URL procesada: ' + this.bookService.getErrorMessage(dbErr));
          });
        });
      }).catch(err => {
        this.allAudios.update(items =>
          items.map(i => i.id === item.id ? { ...i, uploading: false } : i)
        );
        this.toastService.error('Error al guardar audio en Azure: ' + this.bookService.getErrorMessage(err));
      });
    }).catch(err => {
      this.allAudios.update(items =>
        items.map(i => i.id === item.id ? { ...i, uploading: false } : i)
      );
      this.toastService.error('Error al guardar la URL del audio: ' + this.bookService.getErrorMessage(err));
    });
  }

  formComponent = viewChild<AudioForm>(AudioForm);

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    const query: any = {
      page: this.currentPage(),
      limit: this.pageSize(),
    };
    if (this.bookId()) {
      query.bookId = +this.bookId()!;
    }
    if (this.searchQuery()) {
      query.search = this.searchQuery();
    }

    // Call API
    this.bookService.list('audios', query).then((res: any) => {
      if (res && res.data) {
        this.items.set(res.data);
        this.meta.set(res.meta);
      } else {
        this.items.set(Array.isArray(res) ? res : []);
        this.meta.set(null);
      }
      this.loading.set(false);
    }).catch(err => {
      this.toastService.error('Error al cargar datos');
      this.loading.set(false);
    })
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.currentPage.set(1);
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadItems(), 400);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadItems();
  }

  onPageSizeChange(newSize: number) {
    this.pageSize.set(newSize);
    this.currentPage.set(1);
    this.loadItems();
  }

  openCreateModal() { this.showModal.set(true); }
  closeModal() { this.showModal.set(false); }

  navigateToEdit(id: number) {
    const path = buildPath(PATH.admin.book.id.audio.edit)
      .replace(':bookId', this.bookId()!)
      .replace(':id', id.toString());
    this.router.navigate([path]);
  }

  handleModalSubmit() {
    this.formComponent()?.submitForm();
  }

  handleFormSubmit(data: any) {
    this.loading.set(true);
    if (this.bookId()) data.bookId = +this.bookId()!;

    this.bookService.create('audios', data).then(() => {
      this.toastService.success('Creado exitosamente');
      this.loadItems();
      this.closeModal();
    }).catch(err => {
      this.toastService.error(this.bookService.getErrorMessage(err));
      this.loading.set(false);
    });
  }

  deleteItem(id: number) {
    this.alertService.delete('Eliminar', '¿Estás seguro?', () => {
      this.loading.set(true);
      this.bookService.delete('audios', id).then(() => {
        this.toastService.success('Eliminado');
        this.loadItems();
      }).catch(err => {
        this.toastService.error(this.bookService.getErrorMessage(err));
        this.loading.set(false);
      });
    });
  }
}
