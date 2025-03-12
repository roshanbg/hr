import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesService } from '../../../service/employees.service';
import { Router, RouterLink } from '@angular/router';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolsComponent } from '../../../components/tools/tools.component';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';
import { Employees } from '../../../../model/employees.model';

@Component({
  selector: 'app-employees-list',
  imports: [ToolsComponent, FontAwesomeModule, RouterLink],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
})
export class EmployeesListComponent implements OnInit {
  private _employeesService = inject(EmployeesService);
  private _router = inject(Router);
  private _modalService = inject(NgbModal);
  private _toastr = inject(ToastrService);

  faSquarePlus = faSquarePlus;
  employees = signal<Employees[]>([]);

  public ngOnInit(): void {
    this.employees.set(this._employeesService.employees);
  }

  takeAction(event: { id: number; type: string }): void {
    switch (event.type) {
      case 'edit':
        this._router.navigateByUrl(`employees/edit/${event.id}`);
        break;
      case 'view':
        this._router.navigateByUrl(`employees/${event.id}`);
        break;
      case 'delete':
        this._deleteItem(event.id);
        break;
      case 'reset':
        this._resetItem(event.id);
        break;
    }
  }

  doSeach(event: any) {
    this.employees.set(
      this._employeesService.employees.filter((e) =>
        e.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  private _deleteItem(id: number): void {
    const modalRef = this._modalService.open(ConfirmationModalComponent, {
      centered: true,
    });

    modalRef.result.then((e) => {
      if (e) this._confirmDelete(id);
    });
  }

  private _resetItem(id: number): void {
    const employee = this._employeesService.employees.find((e) => e.id === id);
    if (!employee) return;

    employee.roles.forEach((e) => {
      e.allowAccess = false;
      e.allowMange = false;
    });
  }

  private _confirmDelete(id: number) {
    this._employeesService.employees = this._employeesService.employees.filter(
      (e) => e.id !== id
    );

    this.employees.set(this._employeesService.employees);
    this._toastr.success('Delete SuccessfullyS!', 'Success');
  }
}
