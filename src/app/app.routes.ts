import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuard } from '@guard/auth.guard';
import { PATH, buildPath, getPath } from '@route/path.route';
import { SessionService } from '@service/session.service';

const adminMatch = () => {
  const sessionService = inject(SessionService);
  sessionService.restoreSession();
  return sessionService.roles().includes('admin');
};

export const routes: Routes = [
  { path: '', redirectTo: buildPath(PATH.auth.signIn), pathMatch: 'full' },
  {
    path: getPath(PATH.admin),
    loadComponent: () => import('@module/admin/admin').then((m) => m.Admin),
    canActivate: [authGuard],
    canMatch: [adminMatch],
    children: [
      {
        path: getPath(PATH.admin.book),
        loadComponent: () => import('@module/admin/content/book/book').then((m) => m.Book),
        children: [
          { path: getPath(PATH.admin.book.list), loadComponent: () => import('@module/admin/content/book/content/book-list/book-list').then(m => m.BookList) },
          { path: getPath(PATH.admin.book.edit), loadComponent: () => import('@module/admin/content/book/content/book-edit/book-edit').then(m => m.BookEdit) },
          { path: '', redirectTo: getPath(PATH.admin.book.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.index),
        loadComponent: () => import('@module/admin/content/index/index').then((m) => m.Index),
        children: [
          { path: getPath(PATH.admin.index.list), loadComponent: () => import('@module/admin/content/index/content/index-list/index-list').then(m => m.IndexList) },
          { path: getPath(PATH.admin.index.edit), loadComponent: () => import('@module/admin/content/index/content/index-edit/index-edit').then(m => m.IndexEdit) },
          { path: '', redirectTo: getPath(PATH.admin.index.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.unit),
        loadComponent: () => import('@module/admin/content/unit/unit').then((m) => m.Unit),
        children: [
          { path: getPath(PATH.admin.unit.list), loadComponent: () => import('@module/admin/content/unit/content/unit-list/unit-list').then(m => m.UnitList) },
          { path: getPath(PATH.admin.unit.edit), loadComponent: () => import('@module/admin/content/unit/content/unit-edit/unit-edit').then(m => m.UnitEdit) },
          { path: '', redirectTo: getPath(PATH.admin.unit.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.lesson),
        loadComponent: () => import('@module/admin/content/lesson/lesson').then((m) => m.Lesson),
        children: [
          { path: getPath(PATH.admin.lesson.list), loadComponent: () => import('@module/admin/content/lesson/content/lesson-list/lesson-list').then(m => m.LessonList) },
          { path: getPath(PATH.admin.lesson.edit), loadComponent: () => import('@module/admin/content/lesson/content/lesson-edit/lesson-edit').then(m => m.LessonEdit) },
          { path: '', redirectTo: getPath(PATH.admin.lesson.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.panel),
        loadComponent: () => import('@module/admin/content/panel/panel').then((m) => m.Panel),
        children: [
          { path: getPath(PATH.admin.panel.list), loadComponent: () => import('@module/admin/content/panel/content/panel-list/panel-list').then(m => m.PanelList) },
          { path: getPath(PATH.admin.panel.edit), loadComponent: () => import('@module/admin/content/panel/content/panel-edit/panel-edit').then(m => m.PanelEdit) },
          { path: '', redirectTo: getPath(PATH.admin.panel.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.audio),
        loadComponent: () => import('@module/admin/content/audio/audio').then((m) => m.Audio),
        children: [
          { path: getPath(PATH.admin.audio.list), loadComponent: () => import('@module/admin/content/audio/content/audio-list/audio-list').then(m => m.AudioList) },
          { path: getPath(PATH.admin.audio.edit), loadComponent: () => import('@module/admin/content/audio/content/audio-edit/audio-edit').then(m => m.AudioEdit) },
          { path: '', redirectTo: getPath(PATH.admin.audio.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.book) + "/:bookId/" + getPath(PATH.admin.image),
        loadComponent: () => import('@module/admin/content/image/image').then((m) => m.Image),
        children: [
          { path: getPath(PATH.admin.image.list), loadComponent: () => import('@module/admin/content/image/content/image-list/image-list').then(m => m.ImageList) },
          { path: getPath(PATH.admin.image.edit), loadComponent: () => import('@module/admin/content/image/content/image-edit/image-edit').then(m => m.ImageEdit) },
          { path: '', redirectTo: getPath(PATH.admin.image.list), pathMatch: 'full' }
        ]
      },
      { path: '**', redirectTo: getPath(PATH.admin.book), pathMatch: 'full' },
    ],
  },
  {
    path: getPath(PATH.auth),
    children: [
      {
        path: getPath(PATH.auth.signIn),
        loadComponent: () => import('@module/auth/sing-in/sing-in').then((m) => m.SingIn),
      },
      { path: getPath(PATH.auth.signUp), redirectTo: getPath(PATH.auth.signIn), pathMatch: 'full' },
      { path: '**', redirectTo: getPath(PATH.auth.signIn), pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: buildPath(PATH.auth.signIn), pathMatch: 'full' },
];
