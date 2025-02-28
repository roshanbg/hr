export interface Employees {
  id: number;
  name: string;
  email: string;
  age: number;
  roles: EmployeeRole[];
}

export interface EmployeeRole {
  RoleId: number;
  allowAccess: boolean;
  allowMange: boolean;
}
