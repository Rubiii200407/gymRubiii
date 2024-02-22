import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeportesComponent } from './list/deportes.component';
import { DeportesDetailComponent } from './detail/deportes-detail.component';
import { DeportesUpdateComponent } from './update/deportes-update.component';
import { DeportesDeleteDialogComponent } from './delete/deportes-delete-dialog.component';
import { DeportesRoutingModule } from './route/deportes-routing.module';

@NgModule({
  imports: [SharedModule, DeportesRoutingModule],
  declarations: [DeportesComponent, DeportesDetailComponent, DeportesUpdateComponent, DeportesDeleteDialogComponent],
})
export class DeportesModule {}
