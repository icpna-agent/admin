import { Component, signal, inject, viewChild, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { BookTabs } from '../../../../../../../components/book-tabs/book-tabs';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../../../../components/modal-form/modal-form';
import { IndexForm } from '../../layout/index-form/index-form';
import { PaginationComponent } from '@module/admin/components/pagination/pagination';

@Component({
  selector: 'app-index-list',
  imports: [CommonModule, ModalForm, BookTabs, IndexForm, PaginationComponent],
  templateUrl: './index-list.html',
})
export class IndexList {
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

  getSkillLabel(skill: string): string {
    const labels: Record<string, string> = {
      grammar: 'Grammar',
      vocabulary: 'Vocabulary',
      reading: 'Reading',
      listening: 'Listening',
      reading_listening: 'Reading & Listening',
      pronunciation: 'Pronunciation',
      speaking: 'Speaking',
      writing: 'Writing',
      functional_language: 'Functional Language',
      writing_bank: 'Writing Bank',
      speaking_task: 'Speaking Task',
      review: 'Review',
      bring_it_together: 'Bring It Together',
      grammar_reference: 'Grammar Reference',
      communication_bank: 'Communication Bank',
      selected_transcripts: 'Selected Transcripts',
      workbook: 'Workbook'
    };
    return labels[skill] || skill;
  }

  getSkillColor(skill: string): string {
    const colors: Record<string, string> = {
      grammar: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20',
      vocabulary: 'bg-green-600/10 text-green-600 dark:text-green-400 border border-green-600/20',
      reading: 'bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-600/20',
      listening: 'bg-teal-600/10 text-teal-600 dark:text-teal-400 border border-teal-600/20',
      reading_listening: 'bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 border border-cyan-600/20',
      pronunciation: 'bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-600/20',
      speaking: 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-600/20',
      writing: 'bg-pink-600/10 text-pink-600 dark:text-pink-400 border border-pink-600/20',
      functional_language: 'bg-rose-600/10 text-rose-600 dark:text-rose-400 border border-rose-600/20',
      writing_bank: 'bg-amber-600/10 text-amber-600 dark:text-amber-400 border border-amber-600/20',
      speaking_task: 'bg-orange-600/10 text-orange-600 dark:text-orange-400 border border-orange-600/20',
      review: 'bg-yellow-600/10 text-yellow-600 dark:text-yellow-400 border border-yellow-600/20',
      bring_it_together: 'bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/20',
      grammar_reference: 'bg-fuchsia-600/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-600/20',
      communication_bank: 'bg-violet-600/10 text-violet-600 dark:text-violet-400 border border-violet-600/20',
      selected_transcripts: 'bg-sky-600/10 text-sky-600 dark:text-sky-400 border border-sky-600/20',
      workbook: 'bg-slate-600/10 text-slate-600 dark:text-slate-400 border border-slate-600/20'
    };
    return colors[skill] || 'bg-text/5 text-text/60 border border-text/10';
  }

  formComponent = viewChild<IndexForm>(IndexForm);

  constructor() {
    effect(() => {
      const bookId = this.bookId();
      if (!bookId || bookId === this.activeBookId) return;
      this.activeBookId = bookId;
      this.currentPage.set(1);
      this.searchQuery.set('');
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
    this.bookService.list('indexes', query).then((res: any) => {
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
