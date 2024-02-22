import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './planes-nutricion-delete-dialog.component.html',
})
export class PlanesNutricionDeleteDialogComponent {
  planesNutricion?: IPlanesNutricion;

  constructor(protected planesNutricionService: PlanesNutricionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planesNutricionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
