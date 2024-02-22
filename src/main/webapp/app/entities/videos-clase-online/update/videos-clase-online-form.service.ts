import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVideosClaseOnline, NewVideosClaseOnline } from '../videos-clase-online.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVideosClaseOnline for edit and NewVideosClaseOnlineFormGroupInput for create.
 */
type VideosClaseOnlineFormGroupInput = IVideosClaseOnline | PartialWithRequiredKeyOf<NewVideosClaseOnline>;

type VideosClaseOnlineFormDefaults = Pick<NewVideosClaseOnline, 'id'>;

type VideosClaseOnlineFormGroupContent = {
  id: FormControl<IVideosClaseOnline['id'] | NewVideosClaseOnline['id']>;
  tituloVideo: FormControl<IVideosClaseOnline['tituloVideo']>;
  descripcionVideo: FormControl<IVideosClaseOnline['descripcionVideo']>;
  urlVideo: FormControl<IVideosClaseOnline['urlVideo']>;
  duracion: FormControl<IVideosClaseOnline['duracion']>;
  claseOnline: FormControl<IVideosClaseOnline['claseOnline']>;
};

export type VideosClaseOnlineFormGroup = FormGroup<VideosClaseOnlineFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VideosClaseOnlineFormService {
  createVideosClaseOnlineFormGroup(videosClaseOnline: VideosClaseOnlineFormGroupInput = { id: null }): VideosClaseOnlineFormGroup {
    const videosClaseOnlineRawValue = {
      ...this.getFormDefaults(),
      ...videosClaseOnline,
    };
    return new FormGroup<VideosClaseOnlineFormGroupContent>({
      id: new FormControl(
        { value: videosClaseOnlineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tituloVideo: new FormControl(videosClaseOnlineRawValue.tituloVideo),
      descripcionVideo: new FormControl(videosClaseOnlineRawValue.descripcionVideo),
      urlVideo: new FormControl(videosClaseOnlineRawValue.urlVideo),
      duracion: new FormControl(videosClaseOnlineRawValue.duracion),
      claseOnline: new FormControl(videosClaseOnlineRawValue.claseOnline),
    });
  }

  getVideosClaseOnline(form: VideosClaseOnlineFormGroup): IVideosClaseOnline | NewVideosClaseOnline {
    return form.getRawValue() as IVideosClaseOnline | NewVideosClaseOnline;
  }

  resetForm(form: VideosClaseOnlineFormGroup, videosClaseOnline: VideosClaseOnlineFormGroupInput): void {
    const videosClaseOnlineRawValue = { ...this.getFormDefaults(), ...videosClaseOnline };
    form.reset(
      {
        ...videosClaseOnlineRawValue,
        id: { value: videosClaseOnlineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): VideosClaseOnlineFormDefaults {
    return {
      id: null,
    };
  }
}
