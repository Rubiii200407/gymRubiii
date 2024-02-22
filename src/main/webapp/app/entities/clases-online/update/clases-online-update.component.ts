import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ClasesOnlineFormService, ClasesOnlineFormGroup } from './clases-online-form.service';
import { IClasesOnline } from '../clases-online.model';
import { ClasesOnlineService } from '../service/clases-online.service';

@Component({
  selector: 'jhi-clases-online-update',
  templateUrl: './clases-online-update.component.html',
})
export class ClasesOnlineUpdateComponent implements OnInit {
  isSaving = false;
  clasesOnline: IClasesOnline | null = null;

  editForm: ClasesOnlineFormGroup = this.clasesOnlineFormService.createClasesOnlineFormGroup();

  constructor(
    protected clasesOnlineService: ClasesOnlineService,
    protected clasesOnlineFormService: ClasesOnlineFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clasesOnline }) => {
      this.clasesOnline = clasesOnline;
      if (clasesOnline) {
        this.updateForm(clasesOnline);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clasesOnline = this.clasesOnlineFormService.getClasesOnline(this.editForm);
    if (clasesOnline.id !== null) {
      this.subscribeToSaveResponse(this.clasesOnlineService.update(clasesOnline));
    } else {
      this.subscribeToSaveResponse(this.clasesOnlineService.create(clasesOnline));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasesOnline>>): void {
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

  protected updateForm(clasesOnline: IClasesOnline): void {
    this.clasesOnline = clasesOnline;
    this.clasesOnlineFormService.resetForm(this.editForm, clasesOnline);
  }
}
