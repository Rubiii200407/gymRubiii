import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ComentarioNADMINUpdateComponent } from '../comentario/updateNadmin/comentario-nadmin-update.component';
import { ComentarioNutricionUpdateComponent } from '../comentario/updateNutricion/comentario-nutricion-update.component';
import { PlanesNutricionDeleteDialogComponent } from './delete/planes-nutricion-delete-dialog.component';
import { PlanesNutricionDetailComponent } from './detail/planes-nutricion-detail.component';
import { PlanesNutricionDetailNutricionComponent } from './detailNutricion/planes-nutricion-detailNutricion.component';
import { PlanesNutricionComponent } from './list/planes-nutricion.component';
import { PlanesNutricionRoutingModule } from './route/planes-nutricion-routing.module';
import { PlanesNutricionUpdateComponent } from './update/planes-nutricion-update.component';

@NgModule({
  imports: [SharedModule, PlanesNutricionRoutingModule, QuillModule.forRoot()],
  declarations: [
    PlanesNutricionComponent,
    PlanesNutricionDetailComponent,
    PlanesNutricionUpdateComponent,
    PlanesNutricionDeleteDialogComponent,
    PlanesNutricionDetailNutricionComponent,
    ComentarioNutricionUpdateComponent,
    ComentarioNADMINUpdateComponent
    
  ],
})
export class PlanesNutricionModule {}
