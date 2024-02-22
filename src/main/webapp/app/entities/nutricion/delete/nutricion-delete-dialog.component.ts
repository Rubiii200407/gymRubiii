import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INutricion } from '../nutricion.model';
import { NutricionService } from '../service/nutricion.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './nutricion-delete-dialog.component.html',
})
export class NutricionDeleteDialogComponent {
  nutricion?: INutricion;

  constructor(protected nutricionService: NutricionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nutricionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
