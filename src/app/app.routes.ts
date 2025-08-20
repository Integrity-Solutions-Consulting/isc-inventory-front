import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { guestGuard } from './core/guards/guest/guest.guard';
import { ProfileMenuComponent } from './features/profile/profile.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/routes/auth.routing').then((m) => m.auth_routes),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/routes/dashboard.routing').then(
        (m) => m.dashboard_routes
      ),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('../app/errors/routes/error.routing').then(
        (m) => m.error_routes
      ),
  },

        { path: 'profile', component: ProfileMenuComponent },


  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
