import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ClasesOnlineComponent } from './list/clases-online.component';
import { ClasesOnlineDetailComponent } from './detail/clases-online-detail.component';
import { ClasesOnlineUpdateComponent } from './update/clases-online-update.component';
import { ClasesOnlineDeleteDialogComponent } from './delete/clases-online-delete-dialog.component';
import { ClasesOnlineRoutingModule } from './route/clases-online-routing.module';

@NgModule({
  imports: [SharedModule, ClasesOnlineRoutingModule],
  declarations: [ClasesOnlineComponent, ClasesOnlineDetailComponent, ClasesOnlineUpdateComponent, ClasesOnlineDeleteDialogComponent],
})
export class ClasesOnlineModule {}
