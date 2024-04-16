import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFichero } from '../fichero.model';

@Component({
  templateUrl: './fichero-error-modal.component.html',
})
export class FicheroErrorComponent {
  fichero?: IFichero;

  constructor(protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }
}
