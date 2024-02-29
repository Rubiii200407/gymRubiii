import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClasesOnlineDeleteDialogComponent } from './delete/clases-online-delete-dialog.component';
import { ClasesOnlineDetailComponent } from './detail/clases-online-detail.component';
import { ClasesOnlineDetailOnlineComponent } from './detailOnline/clases-online-detailOnline.component';
import { ClasesOnlineComponent } from './list/clases-online.component';
import { ClasesOnlineRoutingModule } from './route/clases-online-routing.module';
import { ClasesOnlineUpdateComponent } from './update/clases-online-update.component';

@NgModule({
  imports: [SharedModule, ClasesOnlineRoutingModule],
  declarations: [ClasesOnlineComponent, ClasesOnlineDetailComponent, ClasesOnlineUpdateComponent, ClasesOnlineDeleteDialogComponent,ClasesOnlineDetailOnlineComponent],
})
export class ClasesOnlineModule {}
