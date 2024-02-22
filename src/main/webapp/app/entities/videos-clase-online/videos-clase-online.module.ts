import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VideosClaseOnlineComponent } from './list/videos-clase-online.component';
import { VideosClaseOnlineDetailComponent } from './detail/videos-clase-online-detail.component';
import { VideosClaseOnlineUpdateComponent } from './update/videos-clase-online-update.component';
import { VideosClaseOnlineDeleteDialogComponent } from './delete/videos-clase-online-delete-dialog.component';
import { VideosClaseOnlineRoutingModule } from './route/videos-clase-online-routing.module';

@NgModule({
  imports: [SharedModule, VideosClaseOnlineRoutingModule],
  declarations: [
    VideosClaseOnlineComponent,
    VideosClaseOnlineDetailComponent,
    VideosClaseOnlineUpdateComponent,
    VideosClaseOnlineDeleteDialogComponent,
  ],
})
export class VideosClaseOnlineModule {}
