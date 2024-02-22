import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PlanesEntrenamientoFormService, PlanesEntrenamientoFormGroup } from './planes-entrenamiento-form.service';
import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

@Component({
  selector: 'jhi-planes-entrenamiento-update',
  templateUrl: './planes-entrenamiento-update.component.html',
})
export class PlanesEntrenamientoUpdateComponent implements OnInit {
  isSaving = false;
  planesEntrenamiento: IPlanesEntrenamiento | null = null;

  editForm: PlanesEntrenamientoFormGroup = this.planesEntrenamientoFormService.createPlanesEntrenamientoFormGroup();

  constructor(
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected planesEntrenamientoFormService: PlanesEntrenamientoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesEntrenamiento }) => {
      this.planesEntrenamiento = planesEntrenamiento;
      if (planesEntrenamiento) {
        this.updateForm(planesEntrenamiento);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planesEntrenamiento = this.planesEntrenamientoFormService.getPlanesEntrenamiento(this.editForm);
    if (planesEntrenamiento.id !== null) {
      this.subscribeToSaveResponse(this.planesEntrenamientoService.update(planesEntrenamiento));
    } else {
      this.subscribeToSaveResponse(this.planesEntrenamientoService.create(planesEntrenamiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanesEntrenamiento>>): void {
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

  protected updateForm(planesEntrenamiento: IPlanesEntrenamiento): void {
    this.planesEntrenamiento = planesEntrenamiento;
    this.planesEntrenamientoFormService.resetForm(this.editForm, planesEntrenamiento);
  }
}
