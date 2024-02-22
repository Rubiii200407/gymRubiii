import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDeportes, NewDeportes } from '../deportes.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDeportes for edit and NewDeportesFormGroupInput for create.
 */
type DeportesFormGroupInput = IDeportes | PartialWithRequiredKeyOf<NewDeportes>;

type DeportesFormDefaults = Pick<NewDeportes, 'id'>;

type DeportesFormGroupContent = {
  id: FormControl<IDeportes['id'] | NewDeportes['id']>;
  nombreDeporte: FormControl<IDeportes['nombreDeporte']>;
  descripcion: FormControl<IDeportes['descripcion']>;
  horariosDisponibles: FormControl<IDeportes['horariosDisponibles']>;
  participantesInscritos: FormControl<IDeportes['participantesInscritos']>;
};

export type DeportesFormGroup = FormGroup<DeportesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DeportesFormService {
  createDeportesFormGroup(deportes: DeportesFormGroupInput = { id: null }): DeportesFormGroup {
    const deportesRawValue = {
      ...this.getFormDefaults(),
      ...deportes,
    };
    return new FormGroup<DeportesFormGroupContent>({
      id: new FormControl(
        { value: deportesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombreDeporte: new FormControl(deportesRawValue.nombreDeporte),
      descripcion: new FormControl(deportesRawValue.descripcion),
      horariosDisponibles: new FormControl(deportesRawValue.horariosDisponibles),
      participantesInscritos: new FormControl(deportesRawValue.participantesInscritos),
    });
  }

  getDeportes(form: DeportesFormGroup): IDeportes | NewDeportes {
    return form.getRawValue() as IDeportes | NewDeportes;
  }

  resetForm(form: DeportesFormGroup, deportes: DeportesFormGroupInput): void {
    const deportesRawValue = { ...this.getFormDefaults(), ...deportes };
    form.reset(
      {
        ...deportesRawValue,
        id: { value: deportesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DeportesFormDefaults {
    return {
      id: null,
    };
  }
}
