import { Component, computed, inject, ChangeDetectionStrategy, input, output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PATH, buildPath, getPath } from '@route/path.route';
import { SessionService } from '@service/session.service';
import { ThemeService } from '@service/theme.service';
import { filter } from 'rxjs';
import { BookService } from '@service/book.service';
import { BookResultDto } from 'api/backend.api';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  private router = inject(Router);
  private sessionService = inject(SessionService);
  private bookService = inject(BookService);
  themeService = inject(ThemeService);
  PATH = PATH;
  buildPath = buildPath;
  currentUrl = signal(this.router.url);
  books = signal<BookResultDto[]>([]);
  booksOpen = signal(true);
  loadingBooks = signal(false);

  isOpen = input(false);
  isCollapsed = input(false);
  close = output<void>();

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set((event as NavigationEnd).urlAfterRedirects));
  }

  canShowBooks = computed(() => this.sessionService.roles().includes('admin'));

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    if (!this.canShowBooks()) return;
    this.loadingBooks.set(true);
    this.bookService
      .listBooks({ page: 1, limit: 100, active: true })
      .then((response) => this.books.set(response.data))
      .catch(() => this.books.set([]))
      .finally(() => this.loadingBooks.set(false));
  }

  toggleBooks() {
    this.booksOpen.update((value) => !value);
  }

  handleBookClick() {
    this.toggleBooks();
    this.navigateTo(buildPath(PATH.admin.book));
  }

  bookPath(bookId: number) {
    return `${buildPath(PATH.admin.book)}/${bookId}/${getPath(PATH.admin.index)}`;
  }

  logout() {
    this.sessionService.removeSession();
    this.router.navigate([buildPath(PATH.auth.signIn)]);
  }

  closeSidebar() {
    this.close.emit();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeSidebar();
  }

  isActive(path: string) {
    return this.currentUrl().startsWith(`/${path}`);
  }

  isBookSectionActive() {
    return this.currentUrl().startsWith(`/${buildPath(PATH.admin.book)}`);
  }
}
