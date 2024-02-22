import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PlanesNutricionFormService, PlanesNutricionFormGroup } from './planes-nutricion-form.service';
import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';
import { INutricion } from 'app/entities/nutricion/nutricion.model';
import { NutricionService } from 'app/entities/nutricion/service/nutricion.service';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';

@Component({
  selector: 'jhi-planes-nutricion-update',
  templateUrl: './planes-nutricion-update.component.html',
})
export class PlanesNutricionUpdateComponent implements OnInit {
  isSaving = false;
  planesNutricion: IPlanesNutricion | null = null;

  nutricionsSharedCollection: INutricion[] = [];
  planesEntrenamientosSharedCollection: IPlanesEntrenamiento[] = [];

  editForm: PlanesNutricionFormGroup = this.planesNutricionFormService.createPlanesNutricionFormGroup();

  constructor(
    protected planesNutricionService: PlanesNutricionService,
    protected planesNutricionFormService: PlanesNutricionFormService,
    protected nutricionService: NutricionService,
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareNutricion = (o1: INutricion | null, o2: INutricion | null): boolean => this.nutricionService.compareNutricion(o1, o2);

  comparePlanesEntrenamiento = (o1: IPlanesEntrenamiento | null, o2: IPlanesEntrenamiento | null): boolean =>
    this.planesEntrenamientoService.comparePlanesEntrenamiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesNutricion }) => {
      this.planesNutricion = planesNutricion;
      if (planesNutricion) {
        this.updateForm(planesNutricion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planesNutricion = this.planesNutricionFormService.getPlanesNutricion(this.editForm);
    if (planesNutricion.id !== null) {
      this.subscribeToSaveResponse(this.planesNutricionService.update(planesNutricion));
    } else {
      this.subscribeToSaveResponse(this.planesNutricionService.create(planesNutricion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanesNutricion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(planesNutricion: IPlanesNutricion): void {
    this.planesNutricion = planesNutricion;
    this.planesNutricionFormService.resetForm(this.editForm, planesNutricion);

    this.nutricionsSharedCollection = this.nutricionService.addNutricionToCollectionIfMissing<INutricion>(
      this.nutricionsSharedCollection,
      planesNutricion.planNutricion
    );
    this.planesEntrenamientosSharedCollection =
      this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
        this.planesEntrenamientosSharedCollection,
        planesNutricion.planEntrenamiento
      );
  }

  protected loadRelationshipsOptions(): void {
    this.nutricionService
      .query()
      .pipe(map((res: HttpResponse<INutricion[]>) => res.body ?? []))
      .pipe(
        map((nutricions: INutricion[]) =>
          this.nutricionService.addNutricionToCollectionIfMissing<INutricion>(nutricions, this.planesNutricion?.planNutricion)
        )
      )
      .subscribe((nutricions: INutricion[]) => (this.nutricionsSharedCollection = nutricions));

    this.planesEntrenamientoService
      .query()
      .pipe(map((res: HttpResponse<IPlanesEntrenamiento[]>) => res.body ?? []))
      .pipe(
        map((planesEntrenamientos: IPlanesEntrenamiento[]) =>
          this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
            planesEntrenamientos,
            this.planesNutricion?.planEntrenamiento
          )
        )
      )
      .subscribe((planesEntrenamientos: IPlanesEntrenamiento[]) => (this.planesEntrenamientosSharedCollection = planesEntrenamientos));
  }
}
