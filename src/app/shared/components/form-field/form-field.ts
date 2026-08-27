import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  host: { class: 'block' },
  templateUrl: './form-field.html',
})
export class FormFieldComponent {
  label = input.required<string>();
  error = input<string>('');
}
