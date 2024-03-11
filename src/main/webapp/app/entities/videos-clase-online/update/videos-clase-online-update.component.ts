import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { VideosClaseOnlineService } from '../service/videos-clase-online.service';
import { IVideosClaseOnline } from '../videos-clase-online.model';
import { VideosClaseOnlineFormGroup, VideosClaseOnlineFormService } from './videos-clase-online-form.service';

@Component({
  selector: 'jhi-videos-clase-online-update',
  templateUrl: './videos-clase-online-update.component.html',
})
export class VideosClaseOnlineUpdateComponent implements OnInit {
  isSaving = false;
  videosClaseOnline: IVideosClaseOnline | null = null;

  clasesOnlinesSharedCollection: IClasesOnline[] = [];

  editForm: VideosClaseOnlineFormGroup = this.videosClaseOnlineFormService.createVideosClaseOnlineFormGroup();

  constructor(
    protected videosClaseOnlineService: VideosClaseOnlineService,
    protected videosClaseOnlineFormService: VideosClaseOnlineFormService,
    protected clasesOnlineService: ClasesOnlineService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareClasesOnline = (o1: IClasesOnline | null, o2: IClasesOnline | null): boolean =>
    this.clasesOnlineService.compareClasesOnline(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ videosClaseOnline }) => {
      this.videosClaseOnline = videosClaseOnline;
      if (videosClaseOnline) {
        this.updateForm(videosClaseOnline);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const videosClaseOnline = this.videosClaseOnlineFormService.getVideosClaseOnline(this.editForm);
    if (videosClaseOnline.id !== null) {
      this.subscribeToSaveResponse(this.videosClaseOnlineService.update(videosClaseOnline));
    } else {
      this.subscribeToSaveResponse(this.videosClaseOnlineService.create(videosClaseOnline));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVideosClaseOnline>>): void {
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

  protected updateForm(videosClaseOnline: IVideosClaseOnline): void {
    this.videosClaseOnline = videosClaseOnline;
    this.videosClaseOnlineFormService.resetForm(this.editForm, videosClaseOnline);

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
