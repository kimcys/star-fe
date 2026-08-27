import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.html',
})
export class SpinnerComponent {
  size = input(32);
  padding = input(24);
}
