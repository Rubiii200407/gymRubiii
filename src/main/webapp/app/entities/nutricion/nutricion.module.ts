import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NutricionComponent } from './list/nutricion.component';
import { NutricionDetailComponent } from './detail/nutricion-detail.component';
import { NutricionUpdateComponent } from './update/nutricion-update.component';
import { NutricionDeleteDialogComponent } from './delete/nutricion-delete-dialog.component';
import { NutricionRoutingModule } from './route/nutricion-routing.module';

@NgModule({
  imports: [SharedModule, NutricionRoutingModule],
  declarations: [NutricionComponent, NutricionDetailComponent, NutricionUpdateComponent, NutricionDeleteDialogComponent],
})
export class NutricionModule {}
