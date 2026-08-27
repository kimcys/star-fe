import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  host: { class: 'block' },
  template: `
    <label class="block">
      <span class="mb-1.5 block text-caption font-medium text-deep-gray">{{ label() }}</span>
      <ng-content></ng-content>
      @if (error()) {
        <span class="mt-1.5 block text-caption text-red-600">{{ error() }}</span>
      }
    </label>
  `,
})
export class FormFieldComponent {
  label = input.required<string>();
  error = input<string>('');
}
