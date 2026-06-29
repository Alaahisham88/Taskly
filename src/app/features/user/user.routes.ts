import { Routes } from '@angular/router';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { PROJECT_ROUTES } from './projects/project.routes';
import { PROJECT_TASKS_ROUTES } from './project tasks/project-tasks.routes';
import { PROJECT_MEMBERS_ROUTES } from './project members/project-members.routes';
import { PROJECT_EBICS_ROUTES } from './project epics/project-ebics.routes';
export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      ...PROJECT_ROUTES,
      ...PROJECT_TASKS_ROUTES,
      ...PROJECT_MEMBERS_ROUTES,
      ...PROJECT_EBICS_ROUTES,
    ],
  },
];
