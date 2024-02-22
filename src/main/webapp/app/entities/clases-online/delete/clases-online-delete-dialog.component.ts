import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IClasesOnline } from '../clases-online.model';
import { ClasesOnlineService } from '../service/clases-online.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './clases-online-delete-dialog.component.html',
})
export class ClasesOnlineDeleteDialogComponent {
  clasesOnline?: IClasesOnline;

  constructor(protected clasesOnlineService: ClasesOnlineService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clasesOnlineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
