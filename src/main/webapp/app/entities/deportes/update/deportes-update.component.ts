import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DeportesFormService, DeportesFormGroup } from './deportes-form.service';
import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';

@Component({
  selector: 'jhi-deportes-update',
  templateUrl: './deportes-update.component.html',
})
export class DeportesUpdateComponent implements OnInit {
  isSaving = false;
  deportes: IDeportes | null = null;

  editForm: DeportesFormGroup = this.deportesFormService.createDeportesFormGroup();

  constructor(
    protected deportesService: DeportesService,
    protected deportesFormService: DeportesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deportes }) => {
      this.deportes = deportes;
      if (deportes) {
        this.updateForm(deportes);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const deportes = this.deportesFormService.getDeportes(this.editForm);
    if (deportes.id !== null) {
      this.subscribeToSaveResponse(this.deportesService.update(deportes));
    } else {
      this.subscribeToSaveResponse(this.deportesService.create(deportes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeportes>>): void {
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

  protected updateForm(deportes: IDeportes): void {
    this.deportes = deportes;
    this.deportesFormService.resetForm(this.editForm, deportes);
  }
}
