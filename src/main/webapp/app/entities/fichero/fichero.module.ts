import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FicheroDeleteDialogComponent } from './delete/fichero-delete-dialog.component';
import { FicheroErrorComponent } from './error/fichero-error-modal.component';
@NgModule({
  imports: [SharedModule],
  declarations: [FicheroDeleteDialogComponent, FicheroErrorComponent],
})
export class FicheroModule {}
