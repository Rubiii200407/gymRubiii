import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanesEntrenamientoComponent } from './list/planes-entrenamiento.component';
import { PlanesEntrenamientoDetailComponent } from './detail/planes-entrenamiento-detail.component';
import { PlanesEntrenamientoUpdateComponent } from './update/planes-entrenamiento-update.component';
import { PlanesEntrenamientoDeleteDialogComponent } from './delete/planes-entrenamiento-delete-dialog.component';
import { PlanesEntrenamientoRoutingModule } from './route/planes-entrenamiento-routing.module';

@NgModule({
  imports: [SharedModule, PlanesEntrenamientoRoutingModule],
  declarations: [
    PlanesEntrenamientoComponent,
    PlanesEntrenamientoDetailComponent,
    PlanesEntrenamientoUpdateComponent,
    PlanesEntrenamientoDeleteDialogComponent,
  ],
})
export class PlanesEntrenamientoModule {}
