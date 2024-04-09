import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';


@Component({
  selector: 'jhi-plan-nutricion-entrenamiento-detail',
  templateUrl: './plan-nutricion-entrenamiento-detail.component.html',
})
export class PlanNutricionEntrenamientoDetailComponent implements OnInit {
    planNutricionEntrenamiento: IPlanNutricionEntrenamiento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planNutricionEntrenamiento }) => {
      this.planNutricionEntrenamiento = planNutricionEntrenamiento;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
