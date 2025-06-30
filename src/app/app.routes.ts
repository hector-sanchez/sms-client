import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SignInComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
];
