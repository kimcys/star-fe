import { Component, input, output } from '@angular/core';

export type InputType = 'text' | 'password' | 'search' | 'email';

@Component({
  selector: 'app-input',
  host: { class: 'block' },
  templateUrl: './input.html',
})
export class InputComponent {
  type = input<InputType>('text');
  name = input('');
  placeholder = input('');
  autocomplete = input('off');
  value = input('');
  valueChange = output<string>();
}
