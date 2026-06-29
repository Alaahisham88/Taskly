import { Routes } from '@angular/router';
export const PROJECT_MEMBERS_ROUTES: Routes = [
  {
    path: 'project-members',
    loadComponent: () =>
      import('./pages/project-members/project-members.component').then(
        (m) => m.ProjectMembersComponent,
      ),
    title: 'Project Members',
  },
];
