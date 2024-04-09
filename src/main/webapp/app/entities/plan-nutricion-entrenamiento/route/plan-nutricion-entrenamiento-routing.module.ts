import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlanNutricionEntrenamientoDetailComponent } from '../detail/plan-nutricion-entrenamiento-detail.component';
import { PlanNutricionEntrenamientoComponent } from '../list/plan-nutricion-entrenamiento.component';
import { PlanNutricionEntrenamientoUpdateComponent } from '../update/plan-nutricion-entrenamiento-update.component';
import { PlanNutricionEntrenamientoRoutingResolveService } from './plan-nutricion-entrenamiento-routing-resolve-service';


const planNutricionEntrenamientoRoute: Routes = [
  {
    path: '',
    component: PlanNutricionEntrenamientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanNutricionEntrenamientoDetailComponent,
    resolve: {
      planNutricionEntrenamiento: PlanNutricionEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanNutricionEntrenamientoUpdateComponent,
    resolve: {
      planNutricionEntrenamiento: PlanNutricionEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanNutricionEntrenamientoUpdateComponent,
    resolve: {
      planNutricionEntrenamiento: PlanNutricionEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(planNutricionEntrenamientoRoute)],
  exports: [RouterModule],
})
export class PlanNutricionEntrenamientoRoutingModule {}
