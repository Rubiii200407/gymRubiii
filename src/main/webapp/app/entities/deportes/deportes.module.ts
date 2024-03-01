import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DeportesDeleteDialogComponent } from './delete/deportes-delete-dialog.component';
import { DeportesDetailComponent } from './detail/deportes-detail.component';
import { DeportesDetailDeporteComponent } from './detailDeporte/deportes-detailDeporte.component';
import { DeportesComponent } from './list/deportes.component';
import { DeportesRoutingModule } from './route/deportes-routing.module';
import { DeportesUpdateComponent } from './update/deportes-update.component';

@NgModule({
  imports: [SharedModule, DeportesRoutingModule],
  declarations: [DeportesComponent, DeportesDetailComponent, DeportesUpdateComponent, DeportesDeleteDialogComponent,DeportesDetailDeporteComponent],
})
export class DeportesModule {}
