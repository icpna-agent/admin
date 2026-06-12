import { Component, inject, input, output, effect, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDateForDatetimeLocal } from '@function/date.function';
import { BookService } from '@service/book.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit {
  private constructorFormularios = inject(FormBuilder);
  private bookService = inject(BookService);

  datos = input<any | null>(null);
  modoEdicion = input<boolean>(false);
  alEnviarFormulario = output<any>();

  libros = signal<any[]>([]);

  formularioUsuario: FormGroup = this.constructorFormularios.group({
    phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
    enabled: [true],
    enabledFrom: [''],
    enabledTo: [''],
    currentBookId: [null],
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
          currentBookId: existente.currentBookId !== undefined ? existente.currentBookId : null,
        });
      } else {
        this.formularioUsuario.reset({
          enabled: true,
          enabledFrom: '',
          enabledTo: '',
          currentBookId: null,
        });
      }
    });
  }

  ngOnInit() {
    this.bookService.listBooks({ limit: 100 }).then((respuesta: any) => {
      const datos = respuesta.data ? respuesta.data : (Array.isArray(respuesta) ? respuesta : []);
      this.libros.set(datos);
    }).catch(() => {
      // Ignorar de forma segura si falla
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
      currentBookId: valores.currentBookId ? Number(valores.currentBookId) : null,
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
