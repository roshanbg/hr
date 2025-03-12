import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesService } from '../../service/employees.service';
import { Employees } from '../../../model/employees.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _employeesService = inject(EmployeesService);

  employeesHaveManage = signal<Employees[]>([]);

  public ngOnInit(): void {
    this._getManage();
  }

  private _getManage() {
    this.employeesHaveManage.set(
      this._employeesService.employees.filter((e) =>
        e.roles.some((r) => r.allowMange)
      )
    );
  }
}
