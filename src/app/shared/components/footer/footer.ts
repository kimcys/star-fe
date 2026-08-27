import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAV_LINKS } from '../../nav-links';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.html',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly links = NAV_LINKS;
}
