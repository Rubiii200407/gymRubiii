import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NutricionFormService, NutricionFormGroup } from './nutricion-form.service';
import { INutricion } from '../nutricion.model';
import { NutricionService } from '../service/nutricion.service';

@Component({
  selector: 'jhi-nutricion-update',
  templateUrl: './nutricion-update.component.html',
})
export class NutricionUpdateComponent implements OnInit {
  isSaving = false;
  nutricion: INutricion | null = null;

  editForm: NutricionFormGroup = this.nutricionFormService.createNutricionFormGroup();

  constructor(
    protected nutricionService: NutricionService,
    protected nutricionFormService: NutricionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nutricion }) => {
      this.nutricion = nutricion;
      if (nutricion) {
        this.updateForm(nutricion);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nutricion = this.nutricionFormService.getNutricion(this.editForm);
    if (nutricion.id !== null) {
      this.subscribeToSaveResponse(this.nutricionService.update(nutricion));
    } else {
      this.subscribeToSaveResponse(this.nutricionService.create(nutricion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INutricion>>): void {
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

  protected updateForm(nutricion: INutricion): void {
    this.nutricion = nutricion;
    this.nutricionFormService.resetForm(this.editForm, nutricion);
  }
}
