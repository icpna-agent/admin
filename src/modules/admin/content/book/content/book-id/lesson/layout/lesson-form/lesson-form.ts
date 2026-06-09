import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiResponse, ApiField } from '@api/backend.api';



@Component({
  selector: 'app-lesson-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lesson-form.html',
})
export class LessonForm {
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBookLesson'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  skills: ApiField<'book', 'findOneBookLesson', 'skill'>[] = [
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
    unitNumber: [null, [Validators.required, Validators.min(0)]],
    title: ['', [Validators.required]],
    skill: ['', [Validators.required]],
    bookPage: [null, [Validators.required, Validators.min(1)]],
    topic: [''],
    activityNumber: [null, [Validators.min(1)]],
    letterNumber: [''],
    instruction: [''],
    content: ['']
  });

  constructor() {
    effect(() => {
      const existing = this.data();
      if (this.editMode() && existing) {
        const patched = {
          ...existing,
          content: existing.content || ''
        };
        this.form.patchValue(patched);
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
    val.unitNumber = +val.unitNumber;
    val.bookPage = +val.bookPage;
    
    if (val.activityNumber !== null && val.activityNumber !== undefined && val.activityNumber !== '') {
      val.activityNumber = +val.activityNumber;
    } else {
      val.activityNumber = null;
    }

    if (val.content && val.content.trim()) {
      val.content = val.content.trim();
    } else {
      val.content = null;
    }

    this.onSubmitForm.emit(val);
  }
}