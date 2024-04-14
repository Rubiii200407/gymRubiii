import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ComentarioComponent } from '../list/comentario.component';
import { ComentarioUpdateComponent } from '../update/comentario-update.component';
import { ComentarioRoutingResolveService } from './comentario-routing-resolve.service';

const comentarioRoute: Routes = [
  {
    path: '',
    component: ComentarioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComentarioUpdateComponent,
    resolve: {},
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComentarioUpdateComponent,
    resolve: {
      comentario: ComentarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(comentarioRoute)],
  exports: [RouterModule],
})
export class ComentarioRoutingModule {}
