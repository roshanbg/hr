import { Component, inject } from '@angular/core';
import { EmployeesService } from '../../../service/employees.service';
import { Router, RouterLink } from '@angular/router';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolsComponent } from '../../../components/tools/tools.component';

@Component({
  selector: 'app-employees-list',
  imports: [ToolsComponent, FontAwesomeModule, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent {
  employeesService = inject(EmployeesService);
  private _router = inject(Router);

  faSquarePlus = faSquarePlus;

  takeAction(event: { id: number; type: string }): void {
    switch (event.type) {
      case 'edit':
        this._router.navigateByUrl(`employees/edit/${event.id}`);
        break;
      case 'view':
        this._router.navigateByUrl(`employees/${event.id}`);
        break;
      case 'delete':
        this.deleteItem(event.id);
    }
  }

  deleteItem(id: number): void {
    this.employeesService.employees = this.employeesService.employees.filter(
      (e) => e.id !== id
    );
  }
}
