import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  host: { class: 'inline-flex items-center' },
  templateUrl: './logo.html',
})
export class LogoComponent {
  heightClass = input('h-9');
}
