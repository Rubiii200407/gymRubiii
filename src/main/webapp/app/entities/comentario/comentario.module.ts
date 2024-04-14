import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ComentarioDeleteDialogComponent } from './delete/comentario-delete-dialog.component';
import { ComentarioDetailComponent } from './detail/comentario-detail.component';
import { ComentarioComponent } from './list/comentario.component';
import { ComentarioRoutingModule } from './route/comentario-routing.module';
@NgModule({
  imports: [SharedModule, ComentarioRoutingModule],
  declarations: [ComentarioDetailComponent, ComentarioDeleteDialogComponent, ComentarioComponent],
})
export class ComentarioModule {}
