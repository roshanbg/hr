import { Component, inject } from '@angular/core';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RolesService } from '../../../service/roles.service';
import { Router, RouterLink } from '@angular/router';
import { ToolsComponent } from '../../../components/tools/tools.component';
import { variationPlacements } from '@popperjs/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles-list',
  imports: [FontAwesomeModule, ToolsComponent, RouterLink],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {
  rolesService = inject(RolesService);
  private _router = inject(Router);
  private _modal = inject(NgbModal);
  private _toastr = inject(ToastrService);

  faSquarePlus = faSquarePlus;
  takeAction(event: { id: number; type: string }): void {
    switch (event.type) {
      case 'edit':
        this._router.navigateByUrl(`/roles/edit/${event.id}`);
        break;
      case 'view':
        this._router.navigateByUrl(`/roles/${event.id}`);
        break;
      case 'delete':
        this._deleteItem(event.id);
    }
  }

  private _deleteItem(id: number): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, {
      centered: true,
    });

    modalRef.result.then((e) => {
      if (e) this._confirmDelete(id);
    });
  }

  private _confirmDelete(id: number): void {
    this.rolesService.roles = this.rolesService.roles.filter(
      (e) => e.id !== id
    );
    this._toastr.success('Delete Confirm', 'successfuly');
  }
}
