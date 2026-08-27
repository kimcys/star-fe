import { Component, input } from '@angular/core';

export type AlertTone = 'error' | 'success' | 'info';

const TONE_CLASSES: Record<AlertTone, string> = {
  error: 'bg-danger-soft text-danger ring-danger/20',
  success: 'bg-success-soft text-success ring-success/20',
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
