import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';
import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './videos-plan-entrenamiento-delete-dialog.component.html',
})
export class VideosPlanEntrenamientoDeleteDialogComponent {
  videosPlanEntrenamiento?: IVideosPlanEntrenamiento;

  constructor(protected videosPlanEntrenamientoService: VideosPlanEntrenamientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.videosPlanEntrenamientoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
