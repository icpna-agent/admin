import { Component, inject, signal, OnInit, viewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { PATH, buildPath } from '@route/path.route';
import { PanelForm } from '../../layout/panel-form/panel-form';

@Component({
  selector: 'app-panel-edit',
  imports: [CommonModule, PanelForm],
  templateUrl: './panel-edit.html',
})
export class PanelEdit implements OnInit {
  private router = inject(Router);
  private bookService = inject(BookService);
  private toastService = inject(ToastService);

  id = input<string>();
  bookId = input<string>();

  data = signal<any | null>(null);
  loading = signal(false);

  formComponent = viewChild<PanelForm>(PanelForm);

  ngOnInit() {
    if (this.id()) {
      this.loadData(+this.id()!);
    } else {
      this.onCancel();
    }
  }

  loadData(id: number) {
    this.loading.set(true);
    this.bookService.findOne('panels', id).then((res: any) => {
      this.data.set(res);
      this.loading.set(false);
    }).catch(err => {
      this.toastService.error('Error al cargar');
      this.onCancel();
    });
  }

  handleFormSubmit(formData: any) {
    this.loading.set(true);
    this.bookService.update('panels', +this.id()!, formData).then(() => {
      this.toastService.success('Actualizado exitosamente');
      this.onCancel();
    }).catch(error => {
      this.toastService.error(this.bookService.getErrorMessage(error));
      this.loading.set(false);
    });
  }

  onCancel() {
    const path = `${buildPath(PATH.admin.book)}/${this.bookId()}/${buildPath(PATH.admin.panel.list)}`;
    this.router.navigate([path]);
  }
}