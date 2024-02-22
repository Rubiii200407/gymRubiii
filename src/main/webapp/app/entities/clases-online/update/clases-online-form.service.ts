import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClasesOnline, NewClasesOnline } from '../clases-online.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClasesOnline for edit and NewClasesOnlineFormGroupInput for create.
 */
type ClasesOnlineFormGroupInput = IClasesOnline | PartialWithRequiredKeyOf<NewClasesOnline>;

type ClasesOnlineFormDefaults = Pick<NewClasesOnline, 'id'>;

type ClasesOnlineFormGroupContent = {
  id: FormControl<IClasesOnline['id'] | NewClasesOnline['id']>;
  nombreClase: FormControl<IClasesOnline['nombreClase']>;
  descripcion: FormControl<IClasesOnline['descripcion']>;
  horario: FormControl<IClasesOnline['horario']>;
  instructor: FormControl<IClasesOnline['instructor']>;
  capacidad: FormControl<IClasesOnline['capacidad']>;
  participantesInscritos: FormControl<IClasesOnline['participantesInscritos']>;
};

export type ClasesOnlineFormGroup = FormGroup<ClasesOnlineFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClasesOnlineFormService {
  createClasesOnlineFormGroup(clasesOnline: ClasesOnlineFormGroupInput = { id: null }): ClasesOnlineFormGroup {
    const clasesOnlineRawValue = {
      ...this.getFormDefaults(),
      ...clasesOnline,
    };
    return new FormGroup<ClasesOnlineFormGroupContent>({
      id: new FormControl(
        { value: clasesOnlineRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombreClase: new FormControl(clasesOnlineRawValue.nombreClase),
      descripcion: new FormControl(clasesOnlineRawValue.descripcion),
      horario: new FormControl(clasesOnlineRawValue.horario),
      instructor: new FormControl(clasesOnlineRawValue.instructor),
      capacidad: new FormControl(clasesOnlineRawValue.capacidad),
      participantesInscritos: new FormControl(clasesOnlineRawValue.participantesInscritos),
    });
  }

  getClasesOnline(form: ClasesOnlineFormGroup): IClasesOnline | NewClasesOnline {
    return form.getRawValue() as IClasesOnline | NewClasesOnline;
  }

  resetForm(form: ClasesOnlineFormGroup, clasesOnline: ClasesOnlineFormGroupInput): void {
    const clasesOnlineRawValue = { ...this.getFormDefaults(), ...clasesOnline };
    form.reset(
      {
        ...clasesOnlineRawValue,
        id: { value: clasesOnlineRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClasesOnlineFormDefaults {
    return {
      id: null,
    };
  }
}
