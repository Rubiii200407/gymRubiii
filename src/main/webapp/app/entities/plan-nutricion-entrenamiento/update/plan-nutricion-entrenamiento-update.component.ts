import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';
import { PlanNutricionEntrenamientoService } from '../service/plan-nutricion-entrenamiento.service';
import { PlanNutricionEntrenamientoFormGroup, PlanNutricionEntrenamientoFormService } from './plan-nutricion-entrenamiento-form.service';


@Component({
  selector: 'jhi-plan-nutricion-entrenamiento-update',
  templateUrl: './plan-nutricion-entrenamiento-update.component.html',
})
export class PlanNutricionEntrenamientoUpdateComponent implements OnInit {
  isSaving = false;
  planNutricionEntrenamiento: IPlanNutricionEntrenamiento | null = null;

  clasesOnlinesSharedCollection: IClasesOnline[] = [];

  editForm: PlanNutricionEntrenamientoFormGroup = this.planNutricionEntrenamientoFormService.createPlanNutricionEntrenamientoFormGroup();

  constructor(
    protected planNutricionEntrenamientoService: PlanNutricionEntrenamientoService,
    protected planNutricionEntrenamientoFormService: PlanNutricionEntrenamientoFormService,
    protected clasesOnlineService: ClasesOnlineService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareClasesOnline = (o1: IClasesOnline | null, o2: IClasesOnline | null): boolean =>
    this.clasesOnlineService.compareClasesOnline(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planNutricionEntrenamiento }) => {
      this.planNutricionEntrenamiento = planNutricionEntrenamiento;
      if (planNutricionEntrenamiento) {
        this.updateForm(planNutricionEntrenamiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planNutricionEntrenamiento = this.planNutricionEntrenamientoFormService.getPlanNutricionEntrenamiento(this.editForm);
    if (planNutricionEntrenamiento.id !== null) {
      this.subscribeToSaveResponse(this.planNutricionEntrenamientoService.update(planNutricionEntrenamiento));
    } else {
      this.subscribeToSaveResponse(this.planNutricionEntrenamientoService.create(planNutricionEntrenamiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanNutricionEntrenamiento>>): void {
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

  protected updateForm(planNutricionEntrenamiento: IPlanNutricionEntrenamiento): void {
    this.planNutricionEntrenamiento = planNutricionEntrenamiento;
    this.planNutricionEntrenamientoFormService.resetForm(this.editForm, planNutricionEntrenamiento);

    this.clasesOnlinesSharedCollection = this.clasesOnlineService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(
      this.clasesOnlinesSharedCollection,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clasesOnlineService
      .query()
      .pipe(map((res: HttpResponse<IClasesOnline[]>) => res.body ?? []))
      .pipe(
        map((clasesOnlines: IClasesOnline[]) =>
          this.clasesOnlineService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(clasesOnlines)
        )
      )
      .subscribe((clasesOnlines: IClasesOnline[]) => (this.clasesOnlinesSharedCollection = clasesOnlines));
  }
}
