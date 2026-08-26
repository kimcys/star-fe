import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ConsentBannerComponent],
  template: `
    <div class="flex min-h-screen flex-col bg-white">
      <app-navbar></app-navbar>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
    <app-consent-banner></app-consent-banner>
  `,
})
export class ShellComponent {}
