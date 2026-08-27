import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';
import { LogoComponent } from '../../shared/components/logo/logo';
import { TopbarComponent } from '../../shared/components/topbar/topbar';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, ConsentBannerComponent, LogoComponent, TopbarComponent, ButtonComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-canvas">
      <app-topbar>
        <a routerLink="/admin/dashboard" class="flex items-center gap-3">
          <app-logo></app-logo>
          <span class="text-caption font-medium text-mid-gray">Admin Portal</span>
        </a>
        @if (auth.session().loggedIn) {
          <div class="flex items-center gap-4">
            <span class="text-caption text-mid-gray">{{ auth.session().username }}</span>
            <app-button variant="outline" size="sm" (click)="logout()">Log out</app-button>
          </div>
        }
      </app-topbar>
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
