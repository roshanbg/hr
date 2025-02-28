import { Injectable } from '@angular/core';
import { Employees } from '../../model/employees.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  employees: Employees[] = [
    {
      id: 1,
      name: 'sdra',
      email: 'sdrabg@gmail.com',
      age: 20,
      roles: [
        {
          RoleId: 1,
          allowAccess: false,
          allowMange: false,
        },
      ],
    },
    {
      id: 2,
      name: 'sara',
      email: 'saranakhal@gmail.com',
      age: 22,
      roles: [
        {
          RoleId: 2,
          allowAccess: false,
          allowMange: false,
        },
      ],
    },
    {
      id: 3,
      name: 'marah',
      email: 'marahna@gmail.com',
      age: 25,
      roles: [
        {
          RoleId: 3,
          allowAccess: false,
          allowMange: false,
        },
      ],
    },
  ];
}
