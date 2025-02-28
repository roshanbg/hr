import { Injectable } from '@angular/core';
import { Roles } from '../../model/roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  roles: Roles[] = [
    {
      id: 1,
      name: 'Office',
    },
    {
      id: 2,
      name: 'Home',
    },
    {
      id: 3,
      name: 'Car1',
    },
  ];
}
