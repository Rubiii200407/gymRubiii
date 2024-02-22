import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';

@Component({
  selector: 'jhi-planes-entrenamiento-detail',
  templateUrl: './planes-entrenamiento-detail.component.html',
})
export class PlanesEntrenamientoDetailComponent implements OnInit {
  planesEntrenamiento: IPlanesEntrenamiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesEntrenamiento }) => {
      this.planesEntrenamiento = planesEntrenamiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
