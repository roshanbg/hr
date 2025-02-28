import { Component, inject } from '@angular/core';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RolesService } from '../../../service/roles.service';
import { Router, RouterLink } from '@angular/router';
import { ToolsComponent } from '../../../components/tools/tools.component';

@Component({
  selector: 'app-roles-list',
  imports: [FontAwesomeModule, ToolsComponent, RouterLink],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {
  rolesService = inject(RolesService);
  private _router = inject(Router);

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
        this.deleteItem(event.id);
    }
  }

  deleteItem(id: number): void {
    this.rolesService.roles = this.rolesService.roles.filter(
      (e) => e.id !== id
    );
  }
}
