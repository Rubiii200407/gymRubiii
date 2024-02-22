import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { IncripcionesComponent } from './list/incripciones.component';
import { IncripcionesDetailComponent } from './detail/incripciones-detail.component';
import { IncripcionesUpdateComponent } from './update/incripciones-update.component';
import { IncripcionesDeleteDialogComponent } from './delete/incripciones-delete-dialog.component';
import { IncripcionesRoutingModule } from './route/incripciones-routing.module';

@NgModule({
  imports: [SharedModule, IncripcionesRoutingModule],
  declarations: [IncripcionesComponent, IncripcionesDetailComponent, IncripcionesUpdateComponent, IncripcionesDeleteDialogComponent],
})
export class IncripcionesModule {}
