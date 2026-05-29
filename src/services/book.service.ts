import { Injectable, inject } from '@angular/core';
import { Api, ApiBody } from 'api/backend.api';

export type BookResource = 'books' | 'indexes' | 'units' | 'lessons' | 'panels' | 'audios' | 'images';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private api = inject(Api);

  listBooks(query: Parameters<Api<unknown>['book']['findAllBooks']>[0] = {}) {
    return this.api.book.findAllBooks(query).then((response) => response.data);
  }

  findOneBook(id: number) {
    return this.api.book.findOneBook({ id }).then((response) => response.data);
  }

  createBook(data: ApiBody<'book', 'createBook'>) {
    return this.api.book.createBook(data).then((response) => response.data);
  }

  updateBook(id: number, data: ApiBody<'book', 'updateBook'>) {
    return this.api.book.updateBook({ id }, data).then((response) => response.data);
  }

  deleteBook(id: number) {
    return this.api.book.deleteBook({ id }).then((response) => response.data);
  }

  list(resource: Exclude<BookResource, 'books'>, query: Record<string, unknown> = {}) {
    const cleanQuery = this.cleanQuery(query);
    switch (resource) {
      case 'indexes':
        return this.api.book.findAllBookIndexes(cleanQuery).then((response) => response.data);
      case 'units':
        return this.api.book.findAllBookUnits(cleanQuery).then((response) => response.data);
      case 'lessons':
        return this.api.book.findAllBookLessons(cleanQuery).then((response) => response.data);
      case 'panels':
        return this.api.book.findAllBookPanels(cleanQuery).then((response) => response.data);
      case 'audios':
        return this.api.book.findAllBookAudios(cleanQuery).then((response) => response.data);
      case 'images':
        return this.api.book.findAllBookImages(cleanQuery).then((response) => response.data);
    }
  }

  
  findOne(resource: Exclude<BookResource, 'books'>, id: number) {
    switch (resource) {
      case 'indexes': return this.api.book.findOneBookIndex({ id }).then(r => r.data);
      case 'units': return this.api.book.findOneBookUnit({ id }).then(r => r.data);
      case 'lessons': return this.api.book.findOneBookLesson({ id }).then(r => r.data);
      case 'panels': return this.api.book.findOneBookPanel({ id }).then(r => r.data);
      case 'audios': return this.api.book.findOneBookAudio({ id }).then(r => r.data);
      case 'images': return this.api.book.findOneBookImage({ id }).then(r => r.data);
    }
  }

  create(resource: Exclude<BookResource, 'books'>, data: Record<string, unknown>) {
    switch (resource) {
      case 'indexes':
        return this.api.book
          .createBookIndex(data as unknown as ApiBody<'book', 'createBookIndex'>)
          .then((response) => response.data);
      case 'units':
        return this.api.book.createBookUnit(data as unknown as ApiBody<'book', 'createBookUnit'>).then((response) => response.data);
      case 'lessons':
        return this.api.book
          .createBookLesson(data as unknown as ApiBody<'book', 'createBookLesson'>)
          .then((response) => response.data);
      case 'panels':
        return this.api.book
          .createBookPanel(data as unknown as ApiBody<'book', 'createBookPanel'>)
          .then((response) => response.data);
      case 'audios':
        return this.api.book
          .createBookAudio(data as unknown as ApiBody<'book', 'createBookAudio'>)
          .then((response) => response.data);
      case 'images':
        return this.api.book
          .createBookImage(data as unknown as ApiBody<'book', 'createBookImage'>)
          .then((response) => response.data);
    }
  }

  update(resource: Exclude<BookResource, 'books'>, id: number, data: Record<string, unknown>) {
    switch (resource) {
      case 'indexes':
        return this.api.book
          .updateBookIndex({ id }, data as ApiBody<'book', 'updateBookIndex'>)
          .then((response) => response.data);
      case 'units':
        return this.api.book.updateBookUnit({ id }, data as ApiBody<'book', 'updateBookUnit'>).then((response) => response.data);
      case 'lessons':
        return this.api.book
          .updateBookLesson({ id }, data as ApiBody<'book', 'updateBookLesson'>)
          .then((response) => response.data);
      case 'panels':
        return this.api.book
          .updateBookPanel({ id }, data as ApiBody<'book', 'updateBookPanel'>)
          .then((response) => response.data);
      case 'audios':
        return this.api.book
          .updateBookAudio({ id }, data as ApiBody<'book', 'updateBookAudio'>)
          .then((response) => response.data);
      case 'images':
        return this.api.book
          .updateBookImage({ id }, data as ApiBody<'book', 'updateBookImage'>)
          .then((response) => response.data);
    }
  }

  delete(resource: Exclude<BookResource, 'books'>, id: number) {
    switch (resource) {
      case 'indexes':
        return this.api.book.deleteBookIndex({ id }).then((response) => response.data);
      case 'units':
        return this.api.book.deleteBookUnit({ id }).then((response) => response.data);
      case 'lessons':
        return this.api.book.deleteBookLesson({ id }).then((response) => response.data);
      case 'panels':
        return this.api.book.deleteBookPanel({ id }).then((response) => response.data);
      case 'audios':
        return this.api.book.deleteBookAudio({ id }).then((response) => response.data);
      case 'images':
        return this.api.book.deleteBookImage({ id }).then((response) => response.data);
    }
  }

  getErrorMessage(error: unknown): string {
    const apiError = error as { error?: { message?: string | string[] }; message?: string };
    const message = apiError.error?.message || apiError.message || 'Ocurrio un error inesperado';
    return Array.isArray(message) ? message[0] : message;
  }

  private cleanQuery(query: Record<string, unknown>) {
    return Object.fromEntries(
      Object.entries(query).filter(([, value]) => value !== '' && value !== undefined && value !== null),
    ) as never;
  }
}
