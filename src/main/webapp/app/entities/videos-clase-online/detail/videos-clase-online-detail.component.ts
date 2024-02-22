import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVideosClaseOnline } from '../videos-clase-online.model';

@Component({
  selector: 'jhi-videos-clase-online-detail',
  templateUrl: './videos-clase-online-detail.component.html',
})
export class VideosClaseOnlineDetailComponent implements OnInit {
  videosClaseOnline: IVideosClaseOnline | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ videosClaseOnline }) => {
      this.videosClaseOnline = videosClaseOnline;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
