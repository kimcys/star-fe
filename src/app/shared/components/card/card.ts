import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  host: { class: 'block' },
  template: `
    <div [class]="classes()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  padded = input(true);

  classes(): string {
    const padding = this.padded() ? ' p-6' : '';
    return `rounded-2xl border border-slate-200 bg-white shadow-sm${padding}`;
  }
}
