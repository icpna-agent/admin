import { Injectable, inject } from '@angular/core';
import { Api, ApiBody } from 'api/backend.api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(Api);

  listarUsuarios(consulta: Record<string, any> = {}) {
    return this.api.user.findAll(consulta as any).then((respuesta) => respuesta.data);
  }

  obtenerUsuario(id: number) {
    return this.api.user.findOne({ id }).then((respuesta) => respuesta.data);
  }

  crearUsuario(datos: ApiBody<'user', 'create'>) {
    return this.api.user.create(datos).then((respuesta) => respuesta.data);
  }

  actualizarUsuario(id: number, datos: ApiBody<'user', 'update'>) {
    return this.api.user.update({ id }, datos).then((respuesta) => respuesta.data);
  }

  eliminarUsuario(id: number) {
    return this.api.user.delete({ id }).then((respuesta) => respuesta.data);
  }

  obtenerMensajeError(error: unknown): string {
    const errorApi = error as { error?: { message?: string | string[] }; message?: string };
    const mensaje = errorApi.error?.message || errorApi.message || 'Ocurrió un error inesperado';
    return Array.isArray(mensaje) ? mensaje[0] : mensaje;
  }
}
