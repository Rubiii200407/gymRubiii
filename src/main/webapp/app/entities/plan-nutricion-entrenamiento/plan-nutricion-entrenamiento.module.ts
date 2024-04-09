import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PlanNutricionEntrenamientoDeleteDialogComponent } from './delete/plan-nutricion-entrenamiento-delete-dialog.component';
import { PlanNutricionEntrenamientoDetailComponent } from './detail/plan-nutricion-entrenamiento-detail.component';
import { PlanNutricionEntrenamientoComponent } from './list/plan-nutricion-entrenamiento.component';
import { PlanNutricionEntrenamientoRoutingModule } from './route/plan-nutricion-entrenamiento-routing.module';
import { PlanNutricionEntrenamientoUpdateComponent } from './update/plan-nutricion-entrenamiento-update.component';

@NgModule({
  imports: [SharedModule, PlanNutricionEntrenamientoRoutingModule],
  declarations: [
    PlanNutricionEntrenamientoComponent,
    PlanNutricionEntrenamientoDetailComponent,
    PlanNutricionEntrenamientoUpdateComponent,
    PlanNutricionEntrenamientoDetailComponent,
    PlanNutricionEntrenamientoDeleteDialogComponent,
  ],
})
export class PlanNutricionEntrenamientoModule {}
