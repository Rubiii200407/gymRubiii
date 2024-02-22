import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VideosPlanEntrenamientoComponent } from './list/videos-plan-entrenamiento.component';
import { VideosPlanEntrenamientoDetailComponent } from './detail/videos-plan-entrenamiento-detail.component';
import { VideosPlanEntrenamientoUpdateComponent } from './update/videos-plan-entrenamiento-update.component';
import { VideosPlanEntrenamientoDeleteDialogComponent } from './delete/videos-plan-entrenamiento-delete-dialog.component';
import { VideosPlanEntrenamientoRoutingModule } from './route/videos-plan-entrenamiento-routing.module';

@NgModule({
  imports: [SharedModule, VideosPlanEntrenamientoRoutingModule],
  declarations: [
    VideosPlanEntrenamientoComponent,
    VideosPlanEntrenamientoDetailComponent,
    VideosPlanEntrenamientoUpdateComponent,
    VideosPlanEntrenamientoDeleteDialogComponent,
  ],
})
export class VideosPlanEntrenamientoModule {}
