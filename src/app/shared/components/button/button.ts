import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-light'
  | 'ghost'
  | 'danger';
export type ButtonType = 'button' | 'submit' | 'reset';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 disabled:bg-red-300',
  secondary:
    'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900 disabled:bg-slate-400',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:outline-slate-400 disabled:text-slate-300',
  'outline-light':
    'border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white disabled:text-white/40',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300 disabled:text-slate-300',
  danger:
    'bg-white text-red-600 border border-red-300 hover:bg-red-50 focus-visible:outline-red-400 disabled:text-red-200',
};

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  host: { '[class.block]': 'fullWidth()' },
  template: `
    <ng-template #label>
      @if (loading()) {
        <span
          class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        ></span>
      }
      <ng-content></ng-content>
    </ng-template>

    @if (link()) {
      <a [routerLink]="link()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="label"></ng-container>
      </a>
    } @else {
      <button
        [type]="type()"
        [disabled]="disabled() || loading()"
        [class]="classes()"
      >
        <ng-container [ngTemplateOutlet]="label"></ng-container>
      </button>
    }
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  type = input<ButtonType>('button');
  disabled = input(false);
  loading = input(false);
  fullWidth = input(false);
  link = input<string | null>(null);

  classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed';
    const width = this.fullWidth() ? ' w-full' : '';
    return `${base} ${VARIANT_CLASSES[this.variant()]}${width}`;
  }
}
