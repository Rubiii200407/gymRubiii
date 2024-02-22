import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanesNutricion } from '../planes-nutricion.model';

@Component({
  selector: 'jhi-planes-nutricion-detail',
  templateUrl: './planes-nutricion-detail.component.html',
})
export class PlanesNutricionDetailComponent implements OnInit {
  planesNutricion: IPlanesNutricion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesNutricion }) => {
      this.planesNutricion = planesNutricion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
