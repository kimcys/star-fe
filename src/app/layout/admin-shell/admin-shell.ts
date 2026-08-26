import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, ConsentBannerComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-slate-50">
      <header class="border-b border-slate-200 bg-slate-900">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a routerLink="/admin/dashboard" class="flex items-center gap-2 text-base font-bold text-white">
            <span class="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white">S</span>
            Admin Portal
          </a>
          @if (auth.session().loggedIn) {
            <div class="flex items-center gap-4">
              <span class="text-sm text-slate-300">{{ auth.session().username }}</span>
              <button
                type="button"
                (click)="logout()"
                class="rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
              >
                Log out
              </button>
            </div>
          }
        </div>
      </header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
    </div>
    <app-consent-banner></app-consent-banner>
  `,
})
export class AdminShellComponent {
  constructor(
    readonly auth: AdminAuthService,
    private readonly router: Router,
  ) {}

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigate(['/admin/login']);
  }
}
