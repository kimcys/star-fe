import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggleComponent {
  constructor(readonly theme: ThemeService) {}
}
