import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PATH, buildPath } from '@route/path.route';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-tabs',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './book-tabs.html',
})
export class BookTabs {
  bookId = input.required<string>();

  tabs: Array<{ label: string; path: string; icon: string; disabled?: boolean }> = [
    { label: 'Índice', path: 'index', icon: 'fas fa-list-ol' },
    { label: 'Unidades', path: 'unit', icon: 'fas fa-layer-group' },
    { label: 'Lecciones', path: 'lesson', icon: 'fas fa-chalkboard-user' },
    { label: 'Paneles', path: 'panel', icon: 'fas fa-table-columns' },
    { label: 'Audios', path: 'audio', icon: 'fas fa-volume-high' },
    { label: 'Imágenes', path: 'image', icon: 'fas fa-image' },
    { label: 'IA', path: 'ia', icon: 'fas fa-wand-magic-sparkles' },
  ];

  getTabLink(tabPath: string) {
    return '/' + buildPath(PATH.admin.book) + '/' + this.bookId() + '/' + tabPath + '/list';
  }
}