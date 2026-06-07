import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiResponse } from '@api/backend.api';

@Component({
  selector: 'app-unit-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unit-form.html',
})
export class UnitForm {
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBookUnit'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  grammarList: string[] = [];
  vocabularyList: string[] = [];
  readingListeningList: string[] = [];
  pronunciationList: string[] = [];

  form: FormGroup = this.fb.group({
    number: [null, [Validators.required, Validators.min(1)]],
    title: ['', [Validators.required]],
    bookPage: [null, [Validators.required, Validators.min(1)]],
    grammar: [[]],
    vocabulary: [[]],
    readingListening: [[]],
    pronunciation: [[]]
  });

  constructor() {
    effect(() => {
      const existing = this.data();
      if (this.editMode() && existing) {
        this.form.patchValue(existing);
        this.grammarList = existing.grammar || [];
        this.vocabularyList = existing.vocabulary || [];
        this.readingListeningList = existing.readingListening || [];
        this.pronunciationList = existing.pronunciation || [];
      } else {
        this.form.reset({
          grammar: [],
          vocabulary: [],
          readingListening: [],
          pronunciation: []
        });
        this.grammarList = [];
        this.vocabularyList = [];
        this.readingListeningList = [];
        this.pronunciationList = [];
      }
    });
  }

  addTopic(type: 'grammar' | 'vocabulary' | 'readingListening' | 'pronunciation', inputEl: HTMLInputElement) {
    const value = inputEl.value.trim();
    if (!value) return;

    if (type === 'grammar') {
      if (!this.grammarList.includes(value)) {
        this.grammarList = [...this.grammarList, value];
        this.form.get('grammar')?.setValue(this.grammarList);
      }
    } else if (type === 'vocabulary') {
      if (!this.vocabularyList.includes(value)) {
        this.vocabularyList = [...this.vocabularyList, value];
        this.form.get('vocabulary')?.setValue(this.vocabularyList);
      }
    } else if (type === 'readingListening') {
      if (!this.readingListeningList.includes(value)) {
        this.readingListeningList = [...this.readingListeningList, value];
        this.form.get('readingListening')?.setValue(this.readingListeningList);
      }
    } else if (type === 'pronunciation') {
      if (!this.pronunciationList.includes(value)) {
        this.pronunciationList = [...this.pronunciationList, value];
        this.form.get('pronunciation')?.setValue(this.pronunciationList);
      }
    }

    inputEl.value = '';
  }

  removeTopic(type: 'grammar' | 'vocabulary' | 'readingListening' | 'pronunciation', idx: number) {
    if (type === 'grammar') {
      this.grammarList = this.grammarList.filter((_, i) => i !== idx);
      this.form.get('grammar')?.setValue(this.grammarList);
    } else if (type === 'vocabulary') {
      this.vocabularyList = this.vocabularyList.filter((_, i) => i !== idx);
      this.form.get('vocabulary')?.setValue(this.vocabularyList);
    } else if (type === 'readingListening') {
      this.readingListeningList = this.readingListeningList.filter((_, i) => i !== idx);
      this.form.get('readingListening')?.setValue(this.readingListeningList);
    } else if (type === 'pronunciation') {
      this.pronunciationList = this.pronunciationList.filter((_, i) => i !== idx);
      this.form.get('pronunciation')?.setValue(this.pronunciationList);
    }
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = {
      ...this.form.value,
      number: +this.form.value.number,
      bookPage: +this.form.value.bookPage
    };
    this.onSubmitForm.emit(value);
  }
}