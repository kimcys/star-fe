import { Component, OnDestroy, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/services/admin-auth.service';
import { CardComponent } from '../../../shared/components/card/card';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field';
import { ButtonComponent } from '../../../shared/components/button/button';
import { AlertComponent } from '../../../shared/components/alert/alert';
import { InputComponent } from '../../../shared/components/input/input';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_SECONDS = 60;

@Component({
  selector: 'app-admin-login',
  imports: [CardComponent, FormFieldComponent, ButtonComponent, AlertComponent, InputComponent],
  templateUrl: './admin-login.html',
})
export class AdminLoginComponent implements OnDestroy {
  readonly username = signal('');
  readonly password = signal('');
  readonly submitting = signal(false);
  readonly errorMessage = signal('');
  readonly lockSecondsLeft = signal(0);
  readonly locked = computed(() => this.lockSecondsLeft() > 0);
  private failedAttempts = 0;
  private lockTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly auth: AdminAuthService,
    private readonly router: Router,
  ) {}

  ngOnDestroy(): void {
    this.stopLockTimer();
  }

  private startLock(seconds: number): void {
    this.stopLockTimer();
    this.password.set('');
    this.lockSecondsLeft.set(seconds);
    this.lockTimer = setInterval(() => {
      const left = this.lockSecondsLeft() - 1;
      this.lockSecondsLeft.set(Math.max(left, 0));
      if (left <= 0) {
        this.stopLockTimer();
        this.errorMessage.set('');
      }
    }, 1000);
  }

  private stopLockTimer(): void {
    if (this.lockTimer !== null) {
      clearInterval(this.lockTimer);
      this.lockTimer = null;
    }
  }

  async submit(): Promise<void> {
    if (this.locked()) {
      return;
    }

    if (!this.username() || !this.password()) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');

    const res = await this.auth.login(this.username(), this.password());
    if (res.success) {
      await this.router.navigate(['/admin/dashboard']);
    } else if (res.locked && res.retryAfterSeconds) {
      this.failedAttempts = 0;
      this.errorMessage.set(res.error ?? 'Too many failed attempts. This account is locked.');
      this.startLock(res.retryAfterSeconds);
    } else {
      this.errorMessage.set(res.error ?? 'Invalid username or password.');
      // Mirror the server's rule so the form locks straight away on the
      // 5th wrong try, even if a proxy hides the server's reply.
      this.failedAttempts += 1;
      if (this.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        this.failedAttempts = 0;
        this.errorMessage.set('Too many failed attempts. Login is locked.');
        this.startLock(LOCK_SECONDS);
      }
    }

    this.submitting.set(false);
  }
}
