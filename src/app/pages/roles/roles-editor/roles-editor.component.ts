import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RolesService } from '../../../service/roles.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageMode } from '../../../../model/enums.model';

@Component({
  selector: 'app-roles-editor',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './roles-editor.component.html',
  styleUrl: './roles-editor.component.scss',
})
export class RolesEditorComponent implements OnInit {
  private _router = inject(Router);
  private _rolesService = inject(RolesService);
  private _formBuilder = inject(FormBuilder);

  form: FormGroup = new FormGroup([]);

  pageMode = input.required<PageMode>();
  id = input.required();

  isEditor = computed(() => this.pageMode() !== PageMode.view);

  private _initForm(): void {
    this.form = this._formBuilder.group({
      id: [Math.floor(Math.random() * 228), [Validators.required]],
      name: [{ value: '', disabled: !this.isEditor() }, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._initForm();

    if (this.id()) this._prepareForms(+this.id()!);
  }

  private _prepareForms(id: number): void {
    const employee = this._rolesService.roles.find((e) => e.id === id);

    if (!employee) return;
    this.form.patchValue(employee);
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.pageMode() === PageMode.edit ? this._edit() : this._creat();

    this._router.navigateByUrl('/roles');
  }

  private _edit(): void {
    const index = this._rolesService.roles.findIndex(
      (e) => e.id === +this.id()!
    );
    if (index < 0) return;
    const form = this.form.getRawValue();

    this._rolesService.roles.splice(index, 1, form);
  }

  private _creat(): void {
    const form = this.form.getRawValue();

    this._rolesService.roles.push(form);
  }
}
