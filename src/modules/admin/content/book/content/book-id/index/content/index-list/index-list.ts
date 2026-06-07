import { Component, signal, inject, OnInit, viewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../../../../components/modal-form/modal-form';
import { IndexForm } from '../../layout/index-form/index-form';

@Component({
  selector: 'app-index-list',
  imports: [CommonModule, ModalForm, BookTabs, IndexForm],
  templateUrl: './index-list.html',
})
export class IndexList implements OnInit {
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

  formComponent = viewChild<IndexForm>(IndexForm);

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    const query: any = { page: 1, limit: 100 };
    if (this.bookId()) {
      query.bookId = +this.bookId()!;
    }
    if (this.searchQuery()) {
      query.search = this.searchQuery();
    }

    // Call API
    this.bookService.list('indexes', query).then((res: any) => {
      this.items.set(res.data ? res.data : (Array.isArray(res) ? res : []));
      this.loading.set(false);
    }).catch(err => {
      this.toastService.error('Error al cargar datos');
      this.loading.set(false);
    })
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadItems(), 400);
  }

  openCreateModal() { this.showModal.set(true); }
  closeModal() { this.showModal.set(false); }

  navigateToEdit(id: number) {
    const path = buildPath(PATH.admin.book.id.index.edit)
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

    this.bookService.create('indexes', data).then(() => {
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
      this.bookService.delete('indexes', id).then(() => {
        this.toastService.success('Eliminado');
        this.loadItems();
      }).catch(err => {
        this.toastService.error(this.bookService.getErrorMessage(err));
        this.loading.set(false);
      });
    });
  }
}