import { Routes } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { PageMode } from '../../../model/enums.model';
import { RolesEditorComponent } from './roles-editor/roles-editor.component';

export const ROLES_ROUTERS: Routes = [
  {
    path: 'roles',
    children: [
      {
        path: '',
        component: RolesListComponent,
      },
      {
        path: 'new',
        component: RolesEditorComponent,
        data: {
          pageMode: PageMode.creat,
        },
      },
      {
        path: 'edit/:id',
        component: RolesEditorComponent,
        data: {
          pageMode: PageMode.edit,
        },
      },
      {
        path: ':id',
        component: RolesEditorComponent,
        data: {
          pageMode: PageMode.view,
        },
      },
    ],
  },
];
