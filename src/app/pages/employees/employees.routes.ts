import { Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesEditorComponent } from './employees-editor/employees-editor.component';
import { PageMode } from '../../../model/enums.model';

export const EMPLOYEES_ROUTERS: Routes = [
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: EmployeesListComponent,
      },
      {
        path: 'new',
        component: EmployeesEditorComponent,
        data: {
          pageMode: PageMode.creat,
        },
      },
      {
        path: 'edit/:id',
        component: EmployeesEditorComponent,
        data: {
          pageMode: PageMode.edit,
        },
      },
      {
        path: ':id',
        component: EmployeesEditorComponent,
        data: {
          pageMode: PageMode.view,
        },
      },
    ],
  },
];
