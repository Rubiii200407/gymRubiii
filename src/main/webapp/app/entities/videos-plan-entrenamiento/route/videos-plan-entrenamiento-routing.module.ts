import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VideosPlanEntrenamientoComponent } from '../list/videos-plan-entrenamiento.component';
import { VideosPlanEntrenamientoDetailComponent } from '../detail/videos-plan-entrenamiento-detail.component';
import { VideosPlanEntrenamientoUpdateComponent } from '../update/videos-plan-entrenamiento-update.component';
import { VideosPlanEntrenamientoRoutingResolveService } from './videos-plan-entrenamiento-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const videosPlanEntrenamientoRoute: Routes = [
  {
    path: '',
    component: VideosPlanEntrenamientoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VideosPlanEntrenamientoDetailComponent,
    resolve: {
      videosPlanEntrenamiento: VideosPlanEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VideosPlanEntrenamientoUpdateComponent,
    resolve: {
      videosPlanEntrenamiento: VideosPlanEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VideosPlanEntrenamientoUpdateComponent,
    resolve: {
      videosPlanEntrenamiento: VideosPlanEntrenamientoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(videosPlanEntrenamientoRoute)],
  exports: [RouterModule],
})
export class VideosPlanEntrenamientoRoutingModule {}
