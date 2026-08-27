import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  host: { class: 'inline-flex items-center' },
  template: `<img src="star-logo-mark.png" alt="Star Media Group" [class]="'w-auto ' + heightClass()" />`,
})
export class LogoComponent {
  heightClass = input('h-9');
}
