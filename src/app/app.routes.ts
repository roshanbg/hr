import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EMPLOYEES_ROUTERS } from './pages/employees/employees.routes';
import { ROLES_ROUTERS } from './pages/roles/roles.routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  ...EMPLOYEES_ROUTERS,
  ...ROLES_ROUTERS,
];
