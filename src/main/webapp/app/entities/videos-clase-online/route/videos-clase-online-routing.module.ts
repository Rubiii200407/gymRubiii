import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VideosClaseOnlineComponent } from '../list/videos-clase-online.component';
import { VideosClaseOnlineDetailComponent } from '../detail/videos-clase-online-detail.component';
import { VideosClaseOnlineUpdateComponent } from '../update/videos-clase-online-update.component';
import { VideosClaseOnlineRoutingResolveService } from './videos-clase-online-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const videosClaseOnlineRoute: Routes = [
  {
    path: '',
    component: VideosClaseOnlineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VideosClaseOnlineDetailComponent,
    resolve: {
      videosClaseOnline: VideosClaseOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VideosClaseOnlineUpdateComponent,
    resolve: {
      videosClaseOnline: VideosClaseOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VideosClaseOnlineUpdateComponent,
    resolve: {
      videosClaseOnline: VideosClaseOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(videosClaseOnlineRoute)],
  exports: [RouterModule],
})
export class VideosClaseOnlineRoutingModule {}
