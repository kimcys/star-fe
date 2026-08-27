import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { FooterComponent } from '../../shared/components/footer/footer';
import { ConsentBannerComponent } from '../../shared/components/consent-banner/consent-banner';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ConsentBannerComponent],
  templateUrl: './shell.html',
})
export class ShellComponent {}
