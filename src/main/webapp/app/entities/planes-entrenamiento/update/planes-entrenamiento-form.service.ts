import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPlanesEntrenamiento, NewPlanesEntrenamiento } from '../planes-entrenamiento.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlanesEntrenamiento for edit and NewPlanesEntrenamientoFormGroupInput for create.
 */
type PlanesEntrenamientoFormGroupInput = IPlanesEntrenamiento | PartialWithRequiredKeyOf<NewPlanesEntrenamiento>;

type PlanesEntrenamientoFormDefaults = Pick<NewPlanesEntrenamiento, 'id'>;

type PlanesEntrenamientoFormGroupContent = {
  id: FormControl<IPlanesEntrenamiento['id'] | NewPlanesEntrenamiento['id']>;
  nombrePlan: FormControl<IPlanesEntrenamiento['nombrePlan']>;
  descripcion: FormControl<IPlanesEntrenamiento['descripcion']>;
  instrucciones: FormControl<IPlanesEntrenamiento['instrucciones']>;
  codigo: FormControl<IPlanesEntrenamiento['codigo']>;
  videoId: FormControl<IPlanesEntrenamiento['videoId']>;
  videoNutricion: FormControl<IPlanesEntrenamiento['videoNutricion']>;
  instruccionesNutricion: FormControl<IPlanesEntrenamiento['instruccionesNutricion']>;
  user: FormControl<IPlanesEntrenamiento['user']>;
  
};

export type PlanesEntrenamientoFormGroup = FormGroup<PlanesEntrenamientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanesEntrenamientoFormService {
  createPlanesEntrenamientoFormGroup(planesEntrenamiento: PlanesEntrenamientoFormGroupInput = { id: null }): PlanesEntrenamientoFormGroup {
    const planesEntrenamientoRawValue = {
      ...this.getFormDefaults(),
      ...planesEntrenamiento,
    };
    return new FormGroup<PlanesEntrenamientoFormGroupContent>({
      id: new FormControl(
        { value: planesEntrenamientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombrePlan: new FormControl(planesEntrenamientoRawValue.nombrePlan),
      descripcion: new FormControl(planesEntrenamientoRawValue.descripcion),
      instrucciones: new FormControl(planesEntrenamientoRawValue.instrucciones),
      codigo: new FormControl(planesEntrenamientoRawValue.codigo),
      videoId: new FormControl(planesEntrenamientoRawValue.videoId),
      videoNutricion: new FormControl(planesEntrenamientoRawValue.videoNutricion),
      instruccionesNutricion: new FormControl(planesEntrenamientoRawValue.instruccionesNutricion),
      user: new FormControl(planesEntrenamientoRawValue.user),

    });
  }

  getPlanesEntrenamiento(form: PlanesEntrenamientoFormGroup): IPlanesEntrenamiento | NewPlanesEntrenamiento {
    return form.getRawValue() as IPlanesEntrenamiento | NewPlanesEntrenamiento;
  }

  resetForm(form: PlanesEntrenamientoFormGroup, planesEntrenamiento: PlanesEntrenamientoFormGroupInput): void {
    const planesEntrenamientoRawValue = { ...this.getFormDefaults(), ...planesEntrenamiento };
    form.reset(
      {
        ...planesEntrenamientoRawValue,
        id: { value: planesEntrenamientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlanesEntrenamientoFormDefaults {
    return {
      id: null,
    };
  }
}
