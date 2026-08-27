import { Component, input } from '@angular/core';

export type AlertTone = 'error' | 'success' | 'info';

const TONE_CLASSES: Record<AlertTone, string> = {
  error: 'bg-red-50 text-red-700 ring-red-600/20',
  success: 'bg-green-50 text-green-700 ring-green-600/20',
  info: 'bg-canvas text-primary-ink ring-hairline',
};

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
})
export class AlertComponent {
  tone = input<AlertTone>('info');
  protected readonly TONE_CLASSES = TONE_CLASSES;
}
