import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVideosClaseOnline } from '../videos-clase-online.model';
import { VideosClaseOnlineService } from '../service/videos-clase-online.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './videos-clase-online-delete-dialog.component.html',
})
export class VideosClaseOnlineDeleteDialogComponent {
  videosClaseOnline?: IVideosClaseOnline;

  constructor(protected videosClaseOnlineService: VideosClaseOnlineService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.videosClaseOnlineService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
