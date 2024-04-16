import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFichero } from '../fichero.model';
import { FicheroService } from '../service/fichero.service';


@Component({
  templateUrl: './fichero-delete-dialog.component.html',
})
export class FicheroDeleteDialogComponent {
  fichero?: IFichero;

  constructor(protected ficheroService: FicheroService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ficheroService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
