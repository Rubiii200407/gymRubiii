import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASC } from 'app/config/navigation.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClasesOnlineDetailComponent } from '../detail/clases-online-detail.component';
import { ClasesOnlineDetailOnlineComponent } from '../detailOnline/clases-online-detailOnline.component';
import { ClasesOnlineComponent } from '../list/clases-online.component';
import { ClasesOnlineUpdateComponent } from '../update/clases-online-update.component';
import { ClasesOnlineRoutingResolveService } from './clases-online-routing-resolve.service';

const clasesOnlineRoute: Routes = [
  {
    path: '',
    component: ClasesOnlineComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':uuid/acceder',
    component: ClasesOnlineDetailOnlineComponent,
  },
  {
    path: ':id/view',
    component: ClasesOnlineDetailComponent,
    resolve: {
      clasesOnline: ClasesOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClasesOnlineUpdateComponent,
    resolve: {
      clasesOnline: ClasesOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClasesOnlineUpdateComponent,
    resolve: {
      clasesOnline: ClasesOnlineRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clasesOnlineRoute)],
  exports: [RouterModule],
})
export class ClasesOnlineRoutingModule {}
