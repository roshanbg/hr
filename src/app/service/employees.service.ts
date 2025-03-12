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
      roles: [],
    },
    {
      id: 2,
      name: 'sara',
      email: 'saranakhal@gmail.com',
      age: 22,
      roles: [],
    },
    {
      id: 3,
      name: 'marah',
      email: 'marahna@gmail.com',
      age: 25,
      roles: [],
    },
  ];
}
