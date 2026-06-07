import { Component, inject, input, output, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api, ApiResponse } from '@api/backend.api';
import { ToastService } from '@service/toast.service';

@Component({
  selector: 'app-audio-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audio-form.html',
})
export class AudioForm {
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private toastService = inject(ToastService);
  
  data = input<ApiResponse<'book', 'findOneBookAudio'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<Record<string, unknown>>();

  uploadingAudio = signal(false);

  form: FormGroup = this.fb.group({
    url: ['', [Validators.required]],
    audioIndex: ['', [Validators.required]],
    transcription: [''],
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
      }
    });
  }

  uploadAudioToMeta() {
    const urlControl = this.form.get('url');
    if (!urlControl || urlControl.invalid || !urlControl.value) {
      this.toastService.error('Por favor, ingresa una URL de audio válida.');
      return;
    }

    this.uploadingAudio.set(true);
    const audioUrl = urlControl.value as string;

    this.api.storage.uploadAudioUrlToMeta({ url: audioUrl })
      .then((res) => {
        if (res.data && res.data.metaMediaId) {
          const numericId = +res.data.metaMediaId;
          this.form.patchValue({ metaMediaId: numericId });
          this.toastService.success('Audio subido y sincronizado con Meta.');
        } else {
          this.toastService.error('Respuesta inesperada del servidor al subir a Meta.');
        }
      })
      .catch((err: unknown) => {
        console.error('Error al subir a Meta:', err);
        const apiError = err as { error?: { message?: string | string[] }; message?: string };
        const message = apiError.error?.message || apiError.message || 'Error al subir audio a Meta';
        const finalMsg = Array.isArray(message) ? message[0] : message;
        this.toastService.error(finalMsg);
      })
      .finally(() => {
        this.uploadingAudio.set(false);
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