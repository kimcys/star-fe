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
    const padding = this.padded() ? ' p-7' : '';
    return `rounded-3xl bg-paper${padding}`;
  }
}
