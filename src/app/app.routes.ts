import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./components/pages/register/register').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./components/pages/signin/signin').then((m) => m.SignInComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/pages/dashboard/dashboard').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./components/pages/messages/messages').then(
        (m) => m.MessagesComponent
      ),
  },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
];
