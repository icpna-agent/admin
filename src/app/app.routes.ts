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
          {
            path: getPath(PATH.admin.book.id),
            children: [
              {
                path: getPath(PATH.admin.book.id.index),
                loadComponent: () => import('@module/admin/content/book/content/book-id/index/index').then((m) => m.Index),
                children: [
                  { path: getPath(PATH.admin.book.id.index.list), loadComponent: () => import('@module/admin/content/book/content/book-id/index/content/index-list/index-list').then(m => m.IndexList) },
                  { path: getPath(PATH.admin.book.id.index.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/index/content/index-edit/index-edit').then(m => m.IndexEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.index.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.unit),
                loadComponent: () => import('@module/admin/content/book/content/book-id/unit/unit').then((m) => m.Unit),
                children: [
                  { path: getPath(PATH.admin.book.id.unit.list), loadComponent: () => import('@module/admin/content/book/content/book-id/unit/content/unit-list/unit-list').then(m => m.UnitList) },
                  { path: getPath(PATH.admin.book.id.unit.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/unit/content/unit-edit/unit-edit').then(m => m.UnitEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.unit.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.lesson),
                loadComponent: () => import('@module/admin/content/book/content/book-id/lesson/lesson').then((m) => m.Lesson),
                children: [
                  { path: getPath(PATH.admin.book.id.lesson.list), loadComponent: () => import('@module/admin/content/book/content/book-id/lesson/content/lesson-list/lesson-list').then(m => m.LessonList) },
                  { path: getPath(PATH.admin.book.id.lesson.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/lesson/content/lesson-edit/lesson-edit').then(m => m.LessonEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.lesson.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.panel),
                loadComponent: () => import('@module/admin/content/book/content/book-id/panel/panel').then((m) => m.Panel),
                children: [
                  { path: getPath(PATH.admin.book.id.panel.list), loadComponent: () => import('@module/admin/content/book/content/book-id/panel/content/panel-list/panel-list').then(m => m.PanelList) },
                  { path: getPath(PATH.admin.book.id.panel.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/panel/content/panel-edit/panel-edit').then(m => m.PanelEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.panel.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.audio),
                loadComponent: () => import('@module/admin/content/book/content/book-id/audio/audio').then((m) => m.Audio),
                children: [
                  { path: getPath(PATH.admin.book.id.audio.list), loadComponent: () => import('@module/admin/content/book/content/book-id/audio/content/audio-list/audio-list').then(m => m.AudioList) },
                  { path: getPath(PATH.admin.book.id.audio.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/audio/content/audio-edit/audio-edit').then(m => m.AudioEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.audio.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.image),
                loadComponent: () => import('@module/admin/content/book/content/book-id/image/image').then((m) => m.Image),
                children: [
                  { path: getPath(PATH.admin.book.id.image.list), loadComponent: () => import('@module/admin/content/book/content/book-id/image/content/image-list/image-list').then(m => m.ImageList) },
                  { path: getPath(PATH.admin.book.id.image.edit), loadComponent: () => import('@module/admin/content/book/content/book-id/image/content/image-edit/image-edit').then(m => m.ImageEdit) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.image.list), pathMatch: 'full' }
                ]
              },
              {
                path: getPath(PATH.admin.book.id.ia),
                loadComponent: () => import('@module/admin/content/book/content/book-id/ia/ia').then((m) => m.IA),
                children: [
                  { path: getPath(PATH.admin.book.id.ia.list), loadComponent: () => import('@module/admin/content/book/content/book-id/ia/content/ia-list/ia-list').then(m => m.IaList) },
                  { path: '', redirectTo: getPath(PATH.admin.book.id.ia.list), pathMatch: 'full' }
                ]
              },
              { path: '', redirectTo: getPath(PATH.admin.book.id.index), pathMatch: 'full' }
            ]
          },
          { path: '', redirectTo: getPath(PATH.admin.book.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.agent),
        loadComponent: () => import('@module/admin/content/agent/agent').then((m) => m.Agent),
        children: [
          { path: getPath(PATH.admin.agent.list), loadComponent: () => import('@module/admin/content/agent/content/agent-list/agent-list').then(m => m.AgentList) },
          { path: getPath(PATH.admin.agent.edit), loadComponent: () => import('@module/admin/content/agent/content/agent-edit/agent-edit').then(m => m.AgentEdit) },
          { path: '', redirectTo: getPath(PATH.admin.agent.list), pathMatch: 'full' }
        ]
      },
      {
        path: getPath(PATH.admin.user),
        loadComponent: () => import('@module/admin/content/user/user').then((m) => m.User),
        children: [
          { path: getPath(PATH.admin.user.list), loadComponent: () => import('@module/admin/content/user/content/user-list/user-list').then(m => m.UserList) },
          { path: getPath(PATH.admin.user.edit), loadComponent: () => import('@module/admin/content/user/content/user-edit/user-edit').then(m => m.UserEdit) },
          { path: '', redirectTo: getPath(PATH.admin.user.list), pathMatch: 'full' }
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
