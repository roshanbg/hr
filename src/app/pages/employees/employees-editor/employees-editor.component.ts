import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmployeesService } from '../../../service/employees.service';
import { PageMode } from '../../../../model/enums.model';
import { RolesService } from '../../../service/roles.service';
import { EmployeeRole } from '../../../../model/employees.model';

@Component({
  selector: 'app-employees-editor',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './employees-editor.component.html',
  styleUrl: './employees-editor.component.scss',
})
export class EmployeesEditorComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _employeesService = inject(EmployeesService);
  _rolesService = inject(RolesService);
  private _router = inject(Router);

  form: FormGroup = new FormGroup({});

  pageMode = input.required<PageMode>();
  id = input.required<string | undefined>();

  isEditor = computed(() => this.pageMode() !== PageMode.view);

  ngOnInit(): void {
    this._initForm();

    if (this.id()) this._prepareForm(+this.id()!);
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      id: [Math.floor(Math.random() * 2228)],
      name: [
        { value: '', disabled: !this.isEditor() },
        [Validators.required, Validators.min(1)],
      ],
      email: [
        { value: '', disabled: !this.isEditor() },
        [Validators.required, Validators.email],
      ],
      age: [{ value: '', disabled: !this.isEditor() }, [Validators.required]],
    });
  }
  private _prepareForm(id: number): void {
    const employee = this._employeesService.employees.find((e) => e.id === id);

    if (!employee) return;

    this.form.patchValue(employee);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.pageMode() === PageMode.edit ? this._edit() : this._creat();
    this._router.navigateByUrl('/employees');
  }

  private _edit(): void {
    const index = this._employeesService.employees.findIndex(
      (e) => e.id === +this.id()!
    );

    if (index < 0) return;
    this._employeesService.employees.splice(index, 1, this.form.getRawValue());
  }
  private _creat(): void {
    const form = this.form.getRawValue();

    this._employeesService.employees.push(form);
  }
  private _roles: EmployeeRole[] = [];

  productSelected(id: number) {
    const productId = this._roles.find((e) => e.RoleId === id);
    if (productId) this._roles = this._roles.filter((e) => e.RoleId !== id);
    else
      this._roles.push({ RoleId: id, allowAccess: false, allowMange: false });
  }

  isCheckboxChecked(id: number) {
    return this._roles.includes({
      RoleId: id,
      allowAccess: false,
      allowMange: false,
    });
  }
}
