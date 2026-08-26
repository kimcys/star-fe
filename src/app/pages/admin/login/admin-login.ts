import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/services/admin-auth.service';
import { CardComponent } from '../../../shared/components/card/card';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field';
import { ButtonComponent } from '../../../shared/components/button/button';
import { AlertComponent } from '../../../shared/components/alert/alert';
import { InputComponent } from '../../../shared/components/input/input';

@Component({
  selector: 'app-admin-login',
  imports: [CardComponent, FormFieldComponent, ButtonComponent, AlertComponent, InputComponent],
  templateUrl: './admin-login.html',
})
export class AdminLoginComponent {
  readonly username = signal('');
  readonly password = signal('');
  readonly submitting = signal(false);
  readonly errorMessage = signal('');

  constructor(
    private readonly auth: AdminAuthService,
    private readonly router: Router,
  ) {}

  async submit(): Promise<void> {
    if (!this.username() || !this.password()) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');

    const res = await this.auth.login(this.username(), this.password());
    if (res.success) {
      await this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage.set(res.error ?? 'Invalid username or password.');
    }

    this.submitting.set(false);
  }
}
