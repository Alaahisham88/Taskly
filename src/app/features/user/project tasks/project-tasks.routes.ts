import { Routes } from '@angular/router';
export const PROJECT_TASKS_ROUTES: Routes = [
  {
    path: 'project-tasks',
    loadComponent: () =>
      import('./pages/project-tasks/project-tasks.component').then(
        (m) => m.ProjectTasksComponent,
      ),
  },
];
