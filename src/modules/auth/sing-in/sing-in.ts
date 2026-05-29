import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '@service/toast.service';
import { getDefaultRoute } from '@route/path.route';
import { Api, ApiBody } from 'api/backend.api';
import { SessionService } from '@service/session.service';

@Component({
  selector: 'app-sing-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sing-in.html',
  styleUrl: './sing-in.css',
})
export class SingIn implements OnInit {
  private toastService = inject(ToastService);
  private router = inject(Router);
  private session = inject(SessionService);
  private api = inject(Api);

  email = signal('admin@icpna.studio');
  password = signal('');

  ngOnInit(): void {
    const currentSession = this.session.session();
    if (currentSession) {
      this.router.navigate([getDefaultRoute(this.session.roles())]);
    }
  }

  loading = signal(false);
  showPassword = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  onLogin(): void {
    if (!this.email() || !this.password()) {
      this.toastService.error('Please enter email and password');
      return;
    }

    this.loading.set(true);

    const credentials: ApiBody<'auth', 'login'> = {
      email: this.email(),
      password: this.password(),
    };

    this.api.auth
      .login(credentials)
      .then((res) => {
        this.session.setSession(res.data);
        this.router.navigate([getDefaultRoute(this.session.roles())]);
        this.toastService.success('Bienvenido!');
      })
      .catch((error) => {
        const message = error.error?.message || error.message || 'Ocurrió un error inesperado';
        const text = Array.isArray(message) ? message[0] : message;
        this.toastService.error(text);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  private getErrorMessage(error: unknown): string {
    const apiError = error as { error?: { message?: string | string[] }; message?: string };
    const message = apiError.error?.message || apiError.message || 'Ocurrio un error inesperado';
    return Array.isArray(message) ? message[0] : message;
  }

}
