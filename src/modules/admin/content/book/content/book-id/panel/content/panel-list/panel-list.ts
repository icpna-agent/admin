import { Component, signal, inject, viewChild, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../../../../components/modal-form/modal-form';
import { PanelForm } from '../../layout/panel-form/panel-form';
import { PaginationComponent } from '@module/admin/components/pagination/pagination';

@Component({
  selector: 'app-panel-list',
  imports: [CommonModule, ModalForm, BookTabs, PanelForm, PaginationComponent],
  templateUrl: './panel-list.html',
})
export class PanelList {
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
  private activeBookId: string | undefined;

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  meta = signal<any | null>(null);

  zoomContent = signal<string | null>(null);
  zoomTitle = signal<string>('');

  openZoom(title: string, content: string) {
    this.zoomTitle.set(title);
    this.zoomContent.set(content);
  }

  closeZoom() {
    this.zoomContent.set(null);
  }

  formComponent = viewChild<PanelForm>(PanelForm);

  constructor() {
    effect(() => {
      const bookId = this.bookId();
      if (!bookId || bookId === this.activeBookId) return;
      this.activeBookId = bookId;
      this.currentPage.set(1);
      this.searchQuery.set('');
      this.closeZoom();
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.loadItems();
    });
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
    this.bookService.list('panels', query).then((res: any) => {
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
    const path = buildPath(PATH.admin.book.id.panel.edit)
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

    this.bookService.create('panels', data).then(() => {
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
      this.bookService.delete('panels', id).then(() => {
        this.toastService.success('Eliminado');
        this.loadItems();
      }).catch(err => {
        this.toastService.error(this.bookService.getErrorMessage(err));
        this.loading.set(false);
      });
    });
  }
}
