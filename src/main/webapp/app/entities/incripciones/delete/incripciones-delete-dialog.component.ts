import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IIncripciones } from '../incripciones.model';
import { IncripcionesService } from '../service/incripciones.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './incripciones-delete-dialog.component.html',
})
export class IncripcionesDeleteDialogComponent {
  incripciones?: IIncripciones;

  constructor(protected incripcionesService: IncripcionesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.incripcionesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
