import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INutricion } from '../nutricion.model';

@Component({
  selector: 'jhi-nutricion-detail',
  templateUrl: './nutricion-detail.component.html',
})
export class NutricionDetailComponent implements OnInit {
  nutricion: INutricion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutricion }) => {
      this.nutricion = nutricion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
