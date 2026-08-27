import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="flex items-center justify-center" [style.padding.px]="padding()">
      <span
        class="animate-spin rounded-full border-4 border-cool-wash border-t-brand-red"
        [style.width.px]="size()"
        [style.height.px]="size()"
        role="status"
        aria-label="Loading"
      ></span>
    </div>
  `,
})
export class SpinnerComponent {
  size = input(32);
  padding = input(24);
}
