import { Component, inject, output, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '@service/session.service';
import { ThemeService } from '@service/theme.service';
import { PATH, buildPath } from '@route/path.route';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sessionService = inject(SessionService);
  themeService = inject(ThemeService);
  router = inject(Router);

  session = this.sessionService.session;
  profilePicture = this.sessionService.profilePicture;
  isDropdownOpen = signal(false);
  photoError = signal(false);

  constructor() {
    effect(() => {
      this.profilePicture();
      this.photoError.set(false);
    });
  }

  userName = computed(() => {
    const u = this.session();
    return u?.user.name ?? '';
  });

  userRole = computed(() => {
    return this.sessionService.roles()[0] || '';
  });

  userInitials = computed(() => {
    const u = this.session();
    if (!u) return '';
    return u.user.name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  });

  toggleSidebar = output<void>();
  toggleCollapse = output<void>();

  onPhotoError() {
    this.photoError.set(true);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onToggleCollapse() {
    this.toggleCollapse.emit();
  }

  onToggleDropdown() {
    this.isDropdownOpen.update((v) => !v);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDropdownOpen.set(false);
  }

  goToProfile() {
    this.router.navigate([buildPath(PATH.admin.agent.list)]);
    this.isDropdownOpen.set(false);
  }

  goToLanding(fragment?: string) {
    window.location.href = fragment ? `/#${fragment}` : '/';
  }

  logout() {
    this.sessionService.removeSession();
    this.router.navigate([buildPath(PATH.auth.signIn)]);
    this.isDropdownOpen.set(false);
  }
}
