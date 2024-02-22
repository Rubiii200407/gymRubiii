import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NutricionComponent } from '../list/nutricion.component';
import { NutricionDetailComponent } from '../detail/nutricion-detail.component';
import { NutricionUpdateComponent } from '../update/nutricion-update.component';
import { NutricionRoutingResolveService } from './nutricion-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const nutricionRoute: Routes = [
  {
    path: '',
    component: NutricionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NutricionDetailComponent,
    resolve: {
      nutricion: NutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NutricionUpdateComponent,
    resolve: {
      nutricion: NutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NutricionUpdateComponent,
    resolve: {
      nutricion: NutricionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nutricionRoute)],
  exports: [RouterModule],
})
export class NutricionRoutingModule {}
