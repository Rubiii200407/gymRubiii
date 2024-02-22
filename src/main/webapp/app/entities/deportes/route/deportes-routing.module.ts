import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeportesComponent } from '../list/deportes.component';
import { DeportesDetailComponent } from '../detail/deportes-detail.component';
import { DeportesUpdateComponent } from '../update/deportes-update.component';
import { DeportesRoutingResolveService } from './deportes-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const deportesRoute: Routes = [
  {
    path: '',
    component: DeportesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeportesDetailComponent,
    resolve: {
      deportes: DeportesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeportesUpdateComponent,
    resolve: {
      deportes: DeportesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeportesUpdateComponent,
    resolve: {
      deportes: DeportesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(deportesRoute)],
  exports: [RouterModule],
})
export class DeportesRoutingModule {}
