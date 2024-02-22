import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './deportes-delete-dialog.component.html',
})
export class DeportesDeleteDialogComponent {
  deportes?: IDeportes;

  constructor(protected deportesService: DeportesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deportesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
