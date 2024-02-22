import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanesNutricionComponent } from './list/planes-nutricion.component';
import { PlanesNutricionDetailComponent } from './detail/planes-nutricion-detail.component';
import { PlanesNutricionUpdateComponent } from './update/planes-nutricion-update.component';
import { PlanesNutricionDeleteDialogComponent } from './delete/planes-nutricion-delete-dialog.component';
import { PlanesNutricionRoutingModule } from './route/planes-nutricion-routing.module';

@NgModule({
  imports: [SharedModule, PlanesNutricionRoutingModule],
  declarations: [
    PlanesNutricionComponent,
    PlanesNutricionDetailComponent,
    PlanesNutricionUpdateComponent,
    PlanesNutricionDeleteDialogComponent,
  ],
})
export class PlanesNutricionModule {}
