import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';
import { LogoComponent } from '../../shared/components/logo/logo';
import { TopbarComponent } from '../../shared/components/topbar/topbar';
import { ButtonComponent } from '../../shared/components/button/button';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-admin-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    ConsentBannerComponent,
    LogoComponent,
    TopbarComponent,
    ButtonComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './admin-shell.html',
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
