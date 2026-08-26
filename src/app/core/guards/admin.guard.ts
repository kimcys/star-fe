import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  try {
    const session = await auth.fetchSession();
    if (session.loggedIn) {
      return true;
    }
  } catch {
    // fall through to redirect
  }

  return router.createUrlTree(['/admin/login']);
};

export const adminLoginGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  try {
    const session = await auth.fetchSession();
    if (session.loggedIn) {
      return router.createUrlTree(['/admin/dashboard']);
    }
  } catch {
    // not logged in - allow access to login page
  }

  return true;
};
