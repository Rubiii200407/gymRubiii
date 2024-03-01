import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DeportesDetailComponent } from '../detail/deportes-detail.component';
import { DeportesDetailDeporteComponent } from '../detailDeporte/deportes-detailDeporte.component';
import { DeportesComponent } from '../list/deportes.component';
import { DeportesUpdateComponent } from '../update/deportes-update.component';
import { DeportesRoutingResolveService } from './deportes-routing-resolve.service';

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
    path: ':uuid/deporte',
    component: DeportesDetailDeporteComponent,
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
