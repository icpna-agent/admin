import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiResponse } from '@api/backend.api';



@Component({
  selector: 'app-panel-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel-form.html',
})
export class PanelForm {
  private fb = inject(FormBuilder);
  
  data = input<ApiResponse<'book', 'findOneBookPanel'> | null>(null);
  editMode = input<boolean>(false);
  onSubmitForm = output<any>();

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    theme: [''],
    subTheme: [''],
    instruction: [''],
    bookPage: [null, [Validators.required, Validators.min(1)]],
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
    val.bookPage = +val.bookPage;

    if (val.content && val.content.trim()) {
      val.content = val.content.trim();
    } else {
      val.content = null;
    }

    this.onSubmitForm.emit(val);
  }
}