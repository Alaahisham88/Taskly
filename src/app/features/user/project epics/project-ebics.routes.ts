import { Routes } from '@angular/router';
export const PROJECT_EBICS_ROUTES: Routes = [
  {
    path: 'project-ebics',
    loadComponent: () =>
      import('./pages/project-ebics/project-ebics.component').then(
        (m) => m.ProjectEbicsComponent,
      ),
    title: 'Project Ebics',
  },
];
