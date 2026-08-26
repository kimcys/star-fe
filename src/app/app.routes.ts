import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell';
import { AdminShellComponent } from './layout/admin-shell/admin-shell';
import { adminGuard, adminLoginGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
        title: 'Star Media Group — Home',
      },
      {
        path: 'about-contact',
        loadComponent: () =>
          import('./pages/about-contact/about-contact').then((m) => m.AboutContactComponent),
        title: 'About Us / Contact Us — Star Media Group',
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicyComponent),
        title: 'Privacy Policy — Star Media Group',
      },
      {
        path: 'terms-conditions',
        loadComponent: () =>
          import('./pages/terms-conditions/terms-conditions').then(
            (m) => m.TermsConditionsComponent,
          ),
        title: 'Terms & Conditions — Star Media Group',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminShellComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/admin/login/admin-login').then((m) => m.AdminLoginComponent),
        canActivate: [adminLoginGuard],
        title: 'Admin Login — Star Media Group',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardComponent,
          ),
        canActivate: [adminGuard],
        title: 'Admin Dashboard — Star Media Group',
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '' },
];
