import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlanesEntrenamientoDetailComponent } from '../detail/planes-entrenamiento-detail.component';
import { PlanesEntrenamientoDetailPlanComponent } from '../detailPlan/planes-entrenamiento-detailPlan.component';
import { PlanesEntrenamientoComponent } from '../list/planes-entrenamiento.component';
import { PlanesEntrenamientoUpdateComponent } from '../update/planes-entrenamiento-update.component';
import { PlanesEntrenamientoRoutingResolveService } from './planes-entrenamiento-routing-resolve.service';

const planesEntrenamientoRoute: Routes = [
  {
    path: '',
    component: PlanesEntrenamientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':uuid/acceder',
    component: PlanesEntrenamientoDetailPlanComponent,
  },
  {
    path: ':id/view',
    component: PlanesEntrenamientoDetailComponent,
    resolve: {
      planesEntrenamiento: PlanesEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'view',
    component: PlanesEntrenamientoDetailComponent,

    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanesEntrenamientoUpdateComponent,
    resolve: {
      planesEntrenamiento: PlanesEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanesEntrenamientoUpdateComponent,
    resolve: {
      planesEntrenamiento: PlanesEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(planesEntrenamientoRoute)],
  exports: [RouterModule],
})
export class PlanesEntrenamientoRoutingModule {}
