import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IncripcionesComponent } from '../list/incripciones.component';
import { IncripcionesDetailComponent } from '../detail/incripciones-detail.component';
import { IncripcionesUpdateComponent } from '../update/incripciones-update.component';
import { IncripcionesRoutingResolveService } from './incripciones-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const incripcionesRoute: Routes = [
  {
    path: '',
    component: IncripcionesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IncripcionesDetailComponent,
    resolve: {
      incripciones: IncripcionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IncripcionesUpdateComponent,
    resolve: {
      incripciones: IncripcionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IncripcionesUpdateComponent,
    resolve: {
      incripciones: IncripcionesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(incripcionesRoute)],
  exports: [RouterModule],
})
export class IncripcionesRoutingModule {}
