import { Component, input, output } from '@angular/core';

export type InputType = 'text' | 'password' | 'search' | 'email';

@Component({
  selector: 'app-input',
  host: { class: 'block' },
  template: `
    <input
      [type]="type()"
      [name]="name()"
      [placeholder]="placeholder()"
      [autocomplete]="autocomplete()"
      [value]="value()"
      (input)="valueChange.emit($any($event.target).value)"
      class="w-full rounded-lg border border-hairline px-3 py-2 text-body-sm text-primary-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
    />
  `,
})
export class InputComponent {
  type = input<InputType>('text');
  name = input('');
  placeholder = input('');
  autocomplete = input('off');
  value = input('');
  valueChange = output<string>();
}
