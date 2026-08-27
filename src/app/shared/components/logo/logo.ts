import { Component, input } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-logo',
  host: { class: 'inline-flex items-center' },
  templateUrl: './logo.html',
})
export class LogoComponent {
  heightClass = input('h-9');

  constructor(readonly theme: ThemeService) {}
}
