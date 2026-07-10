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
  bookId = input<number | null>(null);
  onSubmitForm = output<Record<string, unknown>>();

  uploadingAudio = signal(false);

  form: FormGroup = this.fb.group({
    url: ['', [Validators.required]],
    audioIndex: ['', [Validators.required]],
    transcription: [''],
    bookPage: [null, [Validators.required, Validators.min(1)]],
    metaMediaId: [null],
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
    const audioIndex = String(this.form.get('audioIndex')?.value || '').trim();
    const bookId = this.bookId();

    if (!bookId || !audioIndex) {
      this.uploadingAudio.set(false);
      this.toastService.error('Primero indica el índice del audio antes de procesarlo.');
      return;
    }

    this.api.book.findAllBookAudios({ bookId, search: audioIndex, limit: 20, page: 1 })
      .then((existingRes) => {
        const existing = existingRes.data?.data?.find(
          (item) => item.id !== this.data()?.id && item.audioIndex === audioIndex,
        );
        if (existing) {
          this.toastService.warning(`El audio ${audioIndex} ya está registrado. No se subió otra copia.`);
          throw new Error('DUPLICATE_BOOK_AUDIO');
        }

        return this.api.storage.uploadAudioUrlToMeta({ url: audioUrl });
      })
      .then(async (res) => {
        if (res.data && res.data.url) {
          const stableAudioUrl = res.data.url || audioUrl;
          this.form.patchValue({
            url: stableAudioUrl,
            metaMediaId: null,
          });

          try {
            const transcriptionRes = await this.api.bookAi['book-aiTranscribeAudio']({ url: stableAudioUrl });
            this.form.patchValue({
              transcription: transcriptionRes.data.transcription || '',
            });
            this.toastService.success('Audio guardado en Azure y transcrito.');
          } catch (transcriptionError) {
            console.error('Error al transcribir audio:', transcriptionError);
            this.toastService.warning('Audio guardado en Azure, pero falló la transcripción.');
          }
        } else {
          this.toastService.error('Respuesta inesperada del servidor al subir el audio.');
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.message === 'DUPLICATE_BOOK_AUDIO') {
          return;
        }
        console.error('Error al subir audio:', err);
        const apiError = err as { error?: { message?: string | string[] }; message?: string };
        const message = apiError.error?.message || apiError.message || 'Error al subir audio a Azure';
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
    val['metaMediaId'] = null;

    this.onSubmitForm.emit(val);
  }
}
