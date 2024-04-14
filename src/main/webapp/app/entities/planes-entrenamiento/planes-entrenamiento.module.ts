import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ComentarioEADMINUpdateComponent } from '../comentario/updateEadmin/comentario-eadmin-update.component';
import { ComentarioEntrenamientoUpdateComponent } from '../comentario/updateEntrenamiento/comentario-entrenamiento-update.component';
import { PlanesEntrenamientoDeleteDialogComponent } from './delete/planes-entrenamiento-delete-dialog.component';
import { PlanesEntrenamientoDetailComponent } from './detail/planes-entrenamiento-detail.component';
import { PlanesEntrenamientoDetailPlanComponent } from './detailPlan/planes-entrenamiento-detailPlan.component';
import { PlanesEntrenamientoComponent } from './list/planes-entrenamiento.component';
import { PlanesEntrenamientoRoutingModule } from './route/planes-entrenamiento-routing.module';
import { PlanesEntrenamientoUpdateComponent } from './update/planes-entrenamiento-update.component';

@NgModule({
  imports: [SharedModule, PlanesEntrenamientoRoutingModule, QuillModule.forRoot()],
  declarations: [
    PlanesEntrenamientoComponent,
    PlanesEntrenamientoDetailComponent,
    PlanesEntrenamientoUpdateComponent,
    PlanesEntrenamientoDeleteDialogComponent,
    PlanesEntrenamientoDetailPlanComponent,
    ComentarioEntrenamientoUpdateComponent,
    ComentarioEADMINUpdateComponent
  ],
})
export class PlanesEntrenamientoModule {}
