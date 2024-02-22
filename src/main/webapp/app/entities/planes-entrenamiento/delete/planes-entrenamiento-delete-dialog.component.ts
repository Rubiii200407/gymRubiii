import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './planes-entrenamiento-delete-dialog.component.html',
})
export class PlanesEntrenamientoDeleteDialogComponent {
  planesEntrenamiento?: IPlanesEntrenamiento;

  constructor(protected planesEntrenamientoService: PlanesEntrenamientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planesEntrenamientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
