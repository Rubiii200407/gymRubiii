import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';

@Component({
  selector: 'jhi-videos-plan-entrenamiento-detail',
  templateUrl: './videos-plan-entrenamiento-detail.component.html',
})
export class VideosPlanEntrenamientoDetailComponent implements OnInit {
  videosPlanEntrenamiento: IVideosPlanEntrenamiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ videosPlanEntrenamiento }) => {
      this.videosPlanEntrenamiento = videosPlanEntrenamiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
