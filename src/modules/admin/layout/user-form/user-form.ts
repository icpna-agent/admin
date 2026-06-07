import { Component, inject, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDateForDatetimeLocal } from '@function/date.function';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
})
export class UserForm {
  private constructorFormularios = inject(FormBuilder);

  datos = input<any | null>(null);
  modoEdicion = input<boolean>(false);
  alEnviarFormulario = output<any>();

  formularioUsuario: FormGroup = this.constructorFormularios.group({
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
    enabled: [true],
    enabledFrom: [''],
    enabledTo: [''],
  });

  constructor() {
    effect(() => {
      const existente = this.datos();
      if (this.modoEdicion() && existente) {
        this.formularioUsuario.patchValue({
          phone: existente.phone || '',
          enabled: existente.enabled !== false,
          enabledFrom: existente.enabledFrom ? formatDateForDatetimeLocal(existente.enabledFrom) : '',
          enabledTo: existente.enabledTo ? formatDateForDatetimeLocal(existente.enabledTo) : '',
        });
      } else {
        this.formularioUsuario.reset({
          enabled: true,
          enabledFrom: '',
          enabledTo: '',
        });
      }
    });
  }

  enviarFormulario() {
    if (this.formularioUsuario.invalid) {
      this.formularioUsuario.markAllAsTouched();
      return;
    }

    const valores = this.formularioUsuario.value;
    const datosEnvio: any = {
      phone: valores.phone,
      enabled: valores.enabled,
    };

    if (valores.enabledFrom) {
      datosEnvio.enabledFrom = new Date(valores.enabledFrom).toISOString();
    } else {
      datosEnvio.enabledFrom = null;
    }

    if (valores.enabledTo) {
      datosEnvio.enabledTo = new Date(valores.enabledTo).toISOString();
    } else {
      datosEnvio.enabledTo = null;
    }

    this.alEnviarFormulario.emit(datosEnvio);
  }
}
