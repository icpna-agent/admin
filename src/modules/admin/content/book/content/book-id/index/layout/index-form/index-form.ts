import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse, ApiField } from '@api/backend.api';

@Component({
  selector: 'app-index-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index-form.html',
})
export class IndexForm {
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBookIndex'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  skills: ApiField<'book', 'findOneBookIndex', 'skill'>[] = [
    'grammar',
    'vocabulary',
    'reading',
    'listening',
    'reading_listening',
    'pronunciation',
    'speaking',
    'writing',
    'functional_language',
    'writing_bank',
    'speaking_task',
    'review',
    'bring_it_together',
    'grammar_reference',
    'communication_bank',
    'selected_transcripts',
    'workbook',
  ];

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    page: ['', [Validators.required]],
    skill: ['', [Validators.required]],
    bookPage: [null, [Validators.required, Validators.min(1)]]
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
    const value = {
      ...this.form.value,
      bookPage: +this.form.value.bookPage
    };
    this.onSubmitForm.emit(value);
  }
}