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
export type ButtonSize = 'sm' | 'md';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'px-4 py-2.5 text-body-sm',
  sm: 'px-3 py-1.5 text-caption',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-white hover:bg-[#c01920] focus-visible:outline-brand-red disabled:bg-brand-red/40',
  secondary:
    'bg-primary-ink text-white hover:bg-deep-gray focus-visible:outline-primary-ink disabled:bg-mid-gray',
  outline:
    'border border-primary-ink text-primary-ink hover:bg-cool-wash focus-visible:outline-mid-gray disabled:text-mid-gray disabled:border-hairline',
  'outline-light':
    'border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white disabled:text-white/40',
  ghost:
    'text-mid-gray hover:bg-cool-wash focus-visible:outline-hairline disabled:text-quiet-dot',
  danger:
    'bg-white text-red-600 border border-red-300 hover:bg-red-50 focus-visible:outline-red-400 disabled:text-red-200',
};

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  host: { '[class.block]': 'fullWidth()' },
  templateUrl: './button.html',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');
  disabled = input(false);
  loading = input(false);
  fullWidth = input(false);
  link = input<string | null>(null);

  classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-normal transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed';
    const width = this.fullWidth() ? ' w-full' : '';
    return `${base} ${SIZE_CLASSES[this.size()]} ${VARIANT_CLASSES[this.variant()]}${width}`;
  }
}
