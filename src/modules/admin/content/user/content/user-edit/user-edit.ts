import { Component, inject, signal, OnInit, viewChild, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '@service/user.service';
import { ToastService } from '@service/toast.service';
import { PATH, buildPath } from '@route/path.route';
import { UserForm } from '../../layout/user-form/user-form';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, UserForm],
  templateUrl: './user-edit.html',
})
export class UserEdit implements OnInit {
  private enrutador = inject(Router);
  private usuarioService = inject(UserService);
  private servicioToast = inject(ToastService);

  id = input<string>();

  datos = signal<any | null>(null);
  cargando = signal(false);

  formularioComponente = viewChild<UserForm>(UserForm);

  ngOnInit() {
    if (this.id()) {
      this.cargarDatos(+this.id()!);
    } else {
      this.alCancelar();
    }
  }

  cargarDatos(id: number) {
    this.cargando.set(true);

    this.usuarioService.obtenerUsuario(id).then((usuario: any) => {
      this.datos.set(usuario);
      this.cargando.set(false);
    }).catch(error => {
      this.servicioToast.error('Error al cargar el usuario');
      this.alCancelar();
    });
  }

  guardarCambios(datosFormulario: any) {
    this.cargando.set(true);
    const usuarioId = +this.id()!;

    this.usuarioService.actualizarUsuario(usuarioId, datosFormulario).then(() => {
      this.servicioToast.success('Usuario actualizado exitosamente');
      this.alCancelar();
    }).catch(error => {
      this.servicioToast.error(this.usuarioService.obtenerMensajeError(error));
      this.cargando.set(false);
    });
  }

  alCancelar() {
    const ruta = buildPath(PATH.admin.user.list);
    this.enrutador.navigate([ruta]);
  }
}
