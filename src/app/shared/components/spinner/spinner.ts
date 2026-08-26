import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="flex items-center justify-center" [style.padding.px]="padding()">
      <span
        class="animate-spin rounded-full border-4 border-slate-200 border-t-red-600"
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
