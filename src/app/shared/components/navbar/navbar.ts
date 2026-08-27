import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_LINKS } from '../../nav-links';
import { LogoComponent } from '../logo/logo';
import { TopbarComponent } from '../topbar/topbar';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LogoComponent, TopbarComponent, ThemeToggleComponent],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly links = NAV_LINKS;

  readonly mobileOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
