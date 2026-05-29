import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '@api/backend.api';

@Component({
  selector: 'app-audio-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audio-form.html',
})
export class AudioForm {
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBookAudio'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

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

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = { ...this.form.value };
    val.bookPage = +val.bookPage;
    
    if (val.metaMediaId !== null && val.metaMediaId !== undefined && val.metaMediaId !== '') {
      val.metaMediaId = +val.metaMediaId;
    } else {
      val.metaMediaId = null;
    }

    this.onSubmitForm.emit(val);
  }
}