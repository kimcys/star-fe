import { Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../../../core/services/consent.service';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-consent-banner',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './consent-banner.html',
})
export class ConsentBannerComponent {
  readonly submitting = signal<'accept' | 'decline' | null>(null);
  readonly errorMessage = signal('');

  constructor(readonly consent: ConsentService) {
    void consent.refreshStatus();

    effect(() => {
      const shouldLockScroll = consent.showBanner();
      document.documentElement.classList.toggle('overflow-hidden', shouldLockScroll);
      document.body.classList.toggle('overflow-hidden', shouldLockScroll);
    });
  }

  async accept(): Promise<void> {
    this.submitting.set('accept');
    this.errorMessage.set('');
    try {
      await this.consent.accept();
    } catch {
      this.errorMessage.set('Something went wrong. Please try again.');
    } finally {
      this.submitting.set(null);
    }
  }

  async decline(): Promise<void> {
    this.submitting.set('decline');
    this.errorMessage.set('');
    try {
      await this.consent.decline();
    } catch {
      this.errorMessage.set('Something went wrong. Please try again.');
    } finally {
      this.submitting.set(null);
    }
  }
}
