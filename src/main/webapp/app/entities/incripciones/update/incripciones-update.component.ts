import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IncripcionesFormService, IncripcionesFormGroup } from './incripciones-form.service';
import { IIncripciones } from '../incripciones.model';
import { IncripcionesService } from '../service/incripciones.service';
import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { IDeportes } from 'app/entities/deportes/deportes.model';
import { DeportesService } from 'app/entities/deportes/service/deportes.service';

@Component({
  selector: 'jhi-incripciones-update',
  templateUrl: './incripciones-update.component.html',
})
export class IncripcionesUpdateComponent implements OnInit {
  isSaving = false;
  incripciones: IIncripciones | null = null;

  clasesOnlinesSharedCollection: IClasesOnline[] = [];
  deportesSharedCollection: IDeportes[] = [];

  editForm: IncripcionesFormGroup = this.incripcionesFormService.createIncripcionesFormGroup();

  constructor(
    protected incripcionesService: IncripcionesService,
    protected incripcionesFormService: IncripcionesFormService,
    protected clasesOnlineService: ClasesOnlineService,
    protected deportesService: DeportesService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareClasesOnline = (o1: IClasesOnline | null, o2: IClasesOnline | null): boolean =>
    this.clasesOnlineService.compareClasesOnline(o1, o2);

  compareDeportes = (o1: IDeportes | null, o2: IDeportes | null): boolean => this.deportesService.compareDeportes(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ incripciones }) => {
      this.incripciones = incripciones;
      if (incripciones) {
        this.updateForm(incripciones);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const incripciones = this.incripcionesFormService.getIncripciones(this.editForm);
    if (incripciones.id !== null) {
      this.subscribeToSaveResponse(this.incripcionesService.update(incripciones));
    } else {
      this.subscribeToSaveResponse(this.incripcionesService.create(incripciones));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncripciones>>): void {
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

  protected updateForm(incripciones: IIncripciones): void {
    this.incripciones = incripciones;
    this.incripcionesFormService.resetForm(this.editForm, incripciones);

    this.clasesOnlinesSharedCollection = this.clasesOnlineService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(
      this.clasesOnlinesSharedCollection,
      incripciones.claseOnline
    );
    this.deportesSharedCollection = this.deportesService.addDeportesToCollectionIfMissing<IDeportes>(
      this.deportesSharedCollection,
      incripciones.deporte
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clasesOnlineService
      .query()
      .pipe(map((res: HttpResponse<IClasesOnline[]>) => res.body ?? []))
      .pipe(
        map((clasesOnlines: IClasesOnline[]) =>
          this.clasesOnlineService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(clasesOnlines, this.incripciones?.claseOnline)
        )
      )
      .subscribe((clasesOnlines: IClasesOnline[]) => (this.clasesOnlinesSharedCollection = clasesOnlines));

    this.deportesService
      .query()
      .pipe(map((res: HttpResponse<IDeportes[]>) => res.body ?? []))
      .pipe(
        map((deportes: IDeportes[]) =>
          this.deportesService.addDeportesToCollectionIfMissing<IDeportes>(deportes, this.incripciones?.deporte)
        )
      )
      .subscribe((deportes: IDeportes[]) => (this.deportesSharedCollection = deportes));
  }
}
