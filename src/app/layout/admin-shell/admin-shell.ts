import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, ConsentBannerComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-canvas">
      <header class="sticky top-0 z-30 bg-faded-surface/90 backdrop-blur-xl">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a routerLink="/admin/dashboard" class="flex items-center gap-3">
            <img src="star-logo-mark.png" alt="Star Media Group" class="h-9 w-auto" />
            <span class="text-caption font-medium text-mid-gray">Admin Portal</span>
          </a>
          @if (auth.session().loggedIn) {
            <div class="flex items-center gap-4">
              <span class="text-caption text-mid-gray">{{ auth.session().username }}</span>
              <button
                type="button"
                (click)="logout()"
                class="rounded-full border border-primary-ink px-3 py-1.5 text-caption font-normal text-primary-ink transition-colors hover:bg-cool-wash"
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
