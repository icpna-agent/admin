import { Component, signal, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '@service/user.service';
import { BookService } from '@service/book.service';
import { ToastService } from '@service/toast.service';
import { AlertService } from '@service/alert.service';
import { PATH, buildPath } from '@route/path.route';
import { ModalForm } from '../../../../components/modal-form/modal-form';
import { UserForm } from '../../layout/user-form/user-form';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, ModalForm, UserForm],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  private usuarioService = inject(UserService);
  private bookService = inject(BookService);
  private servicioToast = inject(ToastService);
  private servicioAlerta = inject(AlertService);
  private enrutador = inject(Router);

  usuarios = signal<any[]>([]);
  libros = signal<any[]>([]);
  cargando = signal(false);
  mostrarModal = signal(false);
  consultaBusqueda = signal('');
  private timeoutBusqueda: any;

  formularioComponente = viewChild<UserForm>(UserForm);

  ngOnInit() {
    this.cargarLibros();
    this.cargarUsuarios();
  }

  cargarLibros() {
    this.bookService.listBooks({ limit: 100 }).then((respuesta: any) => {
      const datos = respuesta.data ? respuesta.data : (Array.isArray(respuesta) ? respuesta : []);
      this.libros.set(datos);
    }).catch(() => {
      this.servicioToast.error('Error al cargar la lista de libros');
    });
  }

  obtenerNivelLibro(id: number | null | undefined): string {
    if (!id) return 'Ninguno';
    const libro = this.libros().find(l => l.id === id);
    return libro ? (libro.edition || libro.level) : '---';
  }

  cargarUsuarios() {
    this.cargando.set(true);
    const consulta: any = { page: 1, limit: 100 };
    if (this.consultaBusqueda()) {
      consulta.search = this.consultaBusqueda();
    }

    this.usuarioService.listarUsuarios(consulta).then((respuesta: any) => {
      this.usuarios.set(respuesta.data ? respuesta.data : (Array.isArray(respuesta) ? respuesta : []));
      this.cargando.set(false);
    }).catch(error => {
      this.servicioToast.error('Error al cargar usuarios');
      this.cargando.set(false);
    });
  }

  alBuscar(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;
    this.consultaBusqueda.set(valor);
    if (this.timeoutBusqueda) clearTimeout(this.timeoutBusqueda);
    this.timeoutBusqueda = setTimeout(() => this.cargarUsuarios(), 400);
  }

  abrirModalCrear() { this.mostrarModal.set(true); }
  cerrarModal() { this.mostrarModal.set(false); }

  navegarAEditar(id: number) {
    const ruta = buildPath(PATH.admin.user.edit).replace(':id', id.toString());
    this.enrutador.navigate([ruta]);
  }

  guardarCambiosModal() {
    this.formularioComponente()?.enviarFormulario();
  }

  alEnviarFormulario(datos: any) {
    this.cargando.set(true);

    this.usuarioService.crearUsuario(datos).then(() => {
      this.servicioToast.success('Usuario creado exitosamente');
      this.cargarUsuarios();
      this.cerrarModal();
    }).catch(error => {
      this.servicioToast.error(this.usuarioService.obtenerMensajeError(error));
      this.cargando.set(false);
    });
  }

  eliminarUsuario(id: number) {
    this.servicioAlerta.delete('Eliminar Usuario', '¿Estás seguro de que deseas eliminar este usuario?', () => {
      this.cargando.set(true);
      this.usuarioService.eliminarUsuario(id).then(() => {
        this.servicioToast.success('Usuario eliminado exitosamente');
        this.cargarUsuarios();
      }).catch(error => {
        this.servicioToast.error(this.usuarioService.obtenerMensajeError(error));
        this.cargando.set(false);
      });
    });
  }

  resetearChat(id: number) {
    this.servicioAlerta.confirm('Reset', '¿Estás seguro de que deseas resetear el chat de este usuario?', () => {
      this.cargando.set(true);
      this.usuarioService.disableChat(id).then(() => {
        this.servicioToast.success('Chat reseteado exitosamente');
        this.cargarUsuarios();
      }).catch(error => {
        this.servicioToast.error(this.usuarioService.obtenerMensajeError(error));
        this.cargando.set(false);
      });
    });
  }
}
