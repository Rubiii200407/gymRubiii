import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { VideosPlanEntrenamientoFormService, VideosPlanEntrenamientoFormGroup } from './videos-plan-entrenamiento-form.service';
import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';
import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';

@Component({
  selector: 'jhi-videos-plan-entrenamiento-update',
  templateUrl: './videos-plan-entrenamiento-update.component.html',
})
export class VideosPlanEntrenamientoUpdateComponent implements OnInit {
  isSaving = false;
  videosPlanEntrenamiento: IVideosPlanEntrenamiento | null = null;

  planesEntrenamientosSharedCollection: IPlanesEntrenamiento[] = [];

  editForm: VideosPlanEntrenamientoFormGroup = this.videosPlanEntrenamientoFormService.createVideosPlanEntrenamientoFormGroup();

  constructor(
    protected videosPlanEntrenamientoService: VideosPlanEntrenamientoService,
    protected videosPlanEntrenamientoFormService: VideosPlanEntrenamientoFormService,
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePlanesEntrenamiento = (o1: IPlanesEntrenamiento | null, o2: IPlanesEntrenamiento | null): boolean =>
    this.planesEntrenamientoService.comparePlanesEntrenamiento(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ videosPlanEntrenamiento }) => {
      this.videosPlanEntrenamiento = videosPlanEntrenamiento;
      if (videosPlanEntrenamiento) {
        this.updateForm(videosPlanEntrenamiento);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const videosPlanEntrenamiento = this.videosPlanEntrenamientoFormService.getVideosPlanEntrenamiento(this.editForm);
    if (videosPlanEntrenamiento.id !== null) {
      this.subscribeToSaveResponse(this.videosPlanEntrenamientoService.update(videosPlanEntrenamiento));
    } else {
      this.subscribeToSaveResponse(this.videosPlanEntrenamientoService.create(videosPlanEntrenamiento));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVideosPlanEntrenamiento>>): void {
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

  protected updateForm(videosPlanEntrenamiento: IVideosPlanEntrenamiento): void {
    this.videosPlanEntrenamiento = videosPlanEntrenamiento;
    this.videosPlanEntrenamientoFormService.resetForm(this.editForm, videosPlanEntrenamiento);

    this.planesEntrenamientosSharedCollection =
      this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
        this.planesEntrenamientosSharedCollection,
        videosPlanEntrenamiento.planEntrenamiento
      );
  }

  protected loadRelationshipsOptions(): void {
    this.planesEntrenamientoService
      .query()
      .pipe(map((res: HttpResponse<IPlanesEntrenamiento[]>) => res.body ?? []))
      .pipe(
        map((planesEntrenamientos: IPlanesEntrenamiento[]) =>
          this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
            planesEntrenamientos,
            this.videosPlanEntrenamiento?.planEntrenamiento
          )
        )
      )
      .subscribe((planesEntrenamientos: IPlanesEntrenamiento[]) => (this.planesEntrenamientosSharedCollection = planesEntrenamientos));
  }
}
