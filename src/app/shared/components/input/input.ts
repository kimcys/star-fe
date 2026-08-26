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
      class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
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
