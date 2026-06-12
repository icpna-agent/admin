import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponse, ApiField } from '@api/backend.api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.html',
})
export class BookForm {
  levels: ApiField<'book', 'findOneBook', 'level'>[] = ['basic', 'intermediate', 'advanced'];
  targetPrograms: ApiField<'book', 'findOneBook', 'targetProgram'>[] = ['kids', 'juniors', 'adults'];
  cefrEquivalents: Exclude<ApiField<'book', 'findOneBook', 'cefrEquivalent'>, null | undefined>[] = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
  
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBook'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    author: [''],
    publisher: [''],
    institution: ['ICPNA', [Validators.required]],
    edition: [''],
    level: ['basic', [Validators.required]],
    subLevel: [null, [Validators.min(1)]],
    language: ['english', [Validators.required]],
    targetProgram: ['adults', [Validators.required]],
    cefrEquivalent: [''],
    urlPreview: [''],
    active: [true]
  });

  constructor() {
    effect(() => {
      const existing = this.data();
      if (this.editMode() && existing) {
        this.form.patchValue({
          ...existing,
          cefrEquivalent: existing.cefrEquivalent || ''
        });
      } else {
        this.form.reset({
          institution: 'ICPNA',
          level: 'basic',
          language: 'english',
          targetProgram: 'adults',
          active: true
        });
      }
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = { ...this.form.value };
    if (val.subLevel !== null && val.subLevel !== undefined && val.subLevel !== '') {
      val.subLevel = +val.subLevel;
    } else {
      val.subLevel = null;
    }
    if (val.cefrEquivalent === '') {
      val.cefrEquivalent = null;
    }
    if (val.urlPreview === '') {
      val.urlPreview = null;
    }
    this.onSubmitForm.emit(val);
  }
}