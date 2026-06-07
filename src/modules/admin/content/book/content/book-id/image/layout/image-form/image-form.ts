import { Component, inject, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api, ApiResponse } from '@api/backend.api';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'app-image-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-form.html',
})
export class ImageForm {
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private toastService = inject(ToastService);
  
  data = input<ApiResponse<'book', 'findOneBookImage'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<Record<string, unknown>>();

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  uploadingImage = signal(false);

  form: FormGroup = this.fb.group({
    url: ['', [Validators.required]],
    bookPage: [null, [Validators.required, Validators.min(1)]],
    metaMediaId: [null]
  });

  constructor() {
    effect(() => {
      const existing = this.data();
      if (this.editMode() && existing) {
        this.form.patchValue(existing);
      } else {
        this.form.reset();
        this.clearSelectedFile();
      }
    });
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      this.selectedFile.set(file);
      const localUrl = URL.createObjectURL(file);
      this.previewUrl.set(localUrl);
    }
  }

  clearSelectedFile() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  removeUploadedImage() {
    this.form.patchValue({
      url: '',
      metaMediaId: null
    });
    this.clearSelectedFile();
  }

  uploadImageToMeta() {
    const file = this.selectedFile();
    if (!file) {
      this.toastService.error('Por favor, selecciona una imagen primero.');
      return;
    }

    this.uploadingImage.set(true);

    this.api.storage.uploadImageToMeta({ file })
      .then((res) => {
        if (res.data && res.data.url && res.data.metaMediaId) {
          const numericId = +res.data.metaMediaId;
          this.form.patchValue({
            url: res.data.url,
            metaMediaId: numericId,
          });
          this.toastService.success('Imagen subida a Storage y Meta exitosamente.');
          this.clearSelectedFile();
        } else {
          this.toastService.error('Respuesta inesperada del servidor al subir la imagen.');
        }
      })
      .catch((err: unknown) => {
        console.error('Error al subir imagen:', err);
        const apiError = err as { error?: { message?: string | string[] }; message?: string };
        const message = apiError.error?.message || apiError.message || 'Error al subir imagen a Meta';
        const finalMsg = Array.isArray(message) ? message[0] : message;
        this.toastService.error(finalMsg);
      })
      .finally(() => {
        this.uploadingImage.set(false);
      });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = { ...this.form.value } as Record<string, unknown>;
    val['bookPage'] = +(val['bookPage'] as number | string);
    
    if (val['metaMediaId'] !== null && val['metaMediaId'] !== undefined && val['metaMediaId'] !== '') {
      val['metaMediaId'] = +(val['metaMediaId'] as number | string);
    } else {
      val['metaMediaId'] = null;
    }

    this.onSubmitForm.emit(val);
  }
}