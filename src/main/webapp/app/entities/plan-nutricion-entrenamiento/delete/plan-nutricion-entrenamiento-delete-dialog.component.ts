import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';
import { PlanNutricionEntrenamientoService } from '../service/plan-nutricion-entrenamiento.service';


@Component({
  templateUrl: './plan-nutricion-entrenamiento-delete-dialog.component.html',
})
export class PlanNutricionEntrenamientoDeleteDialogComponent {
    planNutricionEntrenamiento?: IPlanNutricionEntrenamiento;

  constructor(protected planNutricionEntrenamientoService: PlanNutricionEntrenamientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.planNutricionEntrenamientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
