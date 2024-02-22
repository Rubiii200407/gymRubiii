import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVideosPlanEntrenamiento, NewVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVideosPlanEntrenamiento for edit and NewVideosPlanEntrenamientoFormGroupInput for create.
 */
type VideosPlanEntrenamientoFormGroupInput = IVideosPlanEntrenamiento | PartialWithRequiredKeyOf<NewVideosPlanEntrenamiento>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IVideosPlanEntrenamiento | NewVideosPlanEntrenamiento> = Omit<T, 'fechaPublicacion'> & {
  fechaPublicacion?: string | null;
};

type VideosPlanEntrenamientoFormRawValue = FormValueOf<IVideosPlanEntrenamiento>;

type NewVideosPlanEntrenamientoFormRawValue = FormValueOf<NewVideosPlanEntrenamiento>;

type VideosPlanEntrenamientoFormDefaults = Pick<NewVideosPlanEntrenamiento, 'id' | 'fechaPublicacion'>;

type VideosPlanEntrenamientoFormGroupContent = {
  id: FormControl<VideosPlanEntrenamientoFormRawValue['id'] | NewVideosPlanEntrenamiento['id']>;
  tituloVideo: FormControl<VideosPlanEntrenamientoFormRawValue['tituloVideo']>;
  descripcionVideo: FormControl<VideosPlanEntrenamientoFormRawValue['descripcionVideo']>;
  urlVideo: FormControl<VideosPlanEntrenamientoFormRawValue['urlVideo']>;
  duracion: FormControl<VideosPlanEntrenamientoFormRawValue['duracion']>;
  fechaPublicacion: FormControl<VideosPlanEntrenamientoFormRawValue['fechaPublicacion']>;
  planEntrenamiento: FormControl<VideosPlanEntrenamientoFormRawValue['planEntrenamiento']>;
};

export type VideosPlanEntrenamientoFormGroup = FormGroup<VideosPlanEntrenamientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VideosPlanEntrenamientoFormService {
  createVideosPlanEntrenamientoFormGroup(
    videosPlanEntrenamiento: VideosPlanEntrenamientoFormGroupInput = { id: null }
  ): VideosPlanEntrenamientoFormGroup {
    const videosPlanEntrenamientoRawValue = this.convertVideosPlanEntrenamientoToVideosPlanEntrenamientoRawValue({
      ...this.getFormDefaults(),
      ...videosPlanEntrenamiento,
    });
    return new FormGroup<VideosPlanEntrenamientoFormGroupContent>({
      id: new FormControl(
        { value: videosPlanEntrenamientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tituloVideo: new FormControl(videosPlanEntrenamientoRawValue.tituloVideo),
      descripcionVideo: new FormControl(videosPlanEntrenamientoRawValue.descripcionVideo),
      urlVideo: new FormControl(videosPlanEntrenamientoRawValue.urlVideo),
      duracion: new FormControl(videosPlanEntrenamientoRawValue.duracion),
      fechaPublicacion: new FormControl(videosPlanEntrenamientoRawValue.fechaPublicacion),
      planEntrenamiento: new FormControl(videosPlanEntrenamientoRawValue.planEntrenamiento),
    });
  }

  getVideosPlanEntrenamiento(form: VideosPlanEntrenamientoFormGroup): IVideosPlanEntrenamiento | NewVideosPlanEntrenamiento {
    return this.convertVideosPlanEntrenamientoRawValueToVideosPlanEntrenamiento(
      form.getRawValue() as VideosPlanEntrenamientoFormRawValue | NewVideosPlanEntrenamientoFormRawValue
    );
  }

  resetForm(form: VideosPlanEntrenamientoFormGroup, videosPlanEntrenamiento: VideosPlanEntrenamientoFormGroupInput): void {
    const videosPlanEntrenamientoRawValue = this.convertVideosPlanEntrenamientoToVideosPlanEntrenamientoRawValue({
      ...this.getFormDefaults(),
      ...videosPlanEntrenamiento,
    });
    form.reset(
      {
        ...videosPlanEntrenamientoRawValue,
        id: { value: videosPlanEntrenamientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VideosPlanEntrenamientoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fechaPublicacion: currentTime,
    };
  }

  private convertVideosPlanEntrenamientoRawValueToVideosPlanEntrenamiento(
    rawVideosPlanEntrenamiento: VideosPlanEntrenamientoFormRawValue | NewVideosPlanEntrenamientoFormRawValue
  ): IVideosPlanEntrenamiento | NewVideosPlanEntrenamiento {
    return {
      ...rawVideosPlanEntrenamiento,
      fechaPublicacion: dayjs(rawVideosPlanEntrenamiento.fechaPublicacion, DATE_TIME_FORMAT),
    };
  }

  private convertVideosPlanEntrenamientoToVideosPlanEntrenamientoRawValue(
    videosPlanEntrenamiento: IVideosPlanEntrenamiento | (Partial<NewVideosPlanEntrenamiento> & VideosPlanEntrenamientoFormDefaults)
  ): VideosPlanEntrenamientoFormRawValue | PartialWithRequiredKeyOf<NewVideosPlanEntrenamientoFormRawValue> {
    return {
      ...videosPlanEntrenamiento,
      fechaPublicacion: videosPlanEntrenamiento.fechaPublicacion
        ? videosPlanEntrenamiento.fechaPublicacion.format(DATE_TIME_FORMAT)
        : undefined,
    };
  }
}
