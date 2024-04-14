import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ComentarioUpdateComponent } from '../comentario/update/comentario-update.component';
import { ComentarioDeporteUpdateComponent } from '../comentario/updateDeporte/comentario-deporte-update.component';
import { DeportesDeleteDialogComponent } from './delete/deportes-delete-dialog.component';
import { DeportesDetailComponent } from './detail/deportes-detail.component';
import { DeportesDetailDeporteComponent } from './detailDeporte/deportes-detailDeporte.component';
import { DeportesComponent } from './list/deportes.component';
import { DeportesRoutingModule } from './route/deportes-routing.module';
import { DeportesUpdateComponent } from './update/deportes-update.component';

@NgModule({
  imports: [SharedModule, DeportesRoutingModule, QuillModule.forRoot()],
  declarations: [DeportesComponent, DeportesDetailComponent, DeportesUpdateComponent, DeportesDeleteDialogComponent,DeportesDetailDeporteComponent,ComentarioUpdateComponent,ComentarioDeporteUpdateComponent],
})
export class DeportesModule {}
