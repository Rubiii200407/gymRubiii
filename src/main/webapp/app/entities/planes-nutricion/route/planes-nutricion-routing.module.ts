import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PlanesNutricionComponent } from '../list/planes-nutricion.component';
import { PlanesNutricionDetailComponent } from '../detail/planes-nutricion-detail.component';
import { PlanesNutricionUpdateComponent } from '../update/planes-nutricion-update.component';
import { PlanesNutricionRoutingResolveService } from './planes-nutricion-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const planesNutricionRoute: Routes = [
  {
    path: '',
    component: PlanesNutricionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanesNutricionDetailComponent,
    resolve: {
      planesNutricion: PlanesNutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanesNutricionUpdateComponent,
    resolve: {
      planesNutricion: PlanesNutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanesNutricionUpdateComponent,
    resolve: {
      planesNutricion: PlanesNutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(planesNutricionRoute)],
  exports: [RouterModule],
})
export class PlanesNutricionRoutingModule {}
