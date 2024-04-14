import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ComentarioCADMINUpdateComponent } from '../comentario/updateCadmin/comentario-cadmin-update.component';
import { ComentarioClaseUpdateComponent } from '../comentario/updateClase/comentario-clase-update.component';
import { ClasesOnlineDeleteDialogComponent } from './delete/clases-online-delete-dialog.component';
import { ClasesOnlineDetailComponent } from './detail/clases-online-detail.component';
import { ClasesOnlinesDetailClaseComponent } from './detailClase/clases-online-detailClase.component';
import { ClasesOnlineComponent } from './list/clases-online.component';
import { ClasesOnlineRoutingModule } from './route/clases-online-routing.module';
import { ClasesOnlineUpdateComponent } from './update/clases-online-update.component';

@NgModule({
  imports: [SharedModule, ClasesOnlineRoutingModule, QuillModule.forRoot()],
  declarations: [ClasesOnlineComponent, ClasesOnlineDetailComponent, ClasesOnlineUpdateComponent, ClasesOnlineDeleteDialogComponent,ClasesOnlinesDetailClaseComponent,ComentarioClaseUpdateComponent,ComentarioCADMINUpdateComponent],
})
export class ClasesOnlineModule {}
