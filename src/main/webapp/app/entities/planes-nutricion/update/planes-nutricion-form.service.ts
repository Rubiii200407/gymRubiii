import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPlanesNutricion, NewPlanesNutricion } from '../planes-nutricion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlanesNutricion for edit and NewPlanesNutricionFormGroupInput for create.
 */
type PlanesNutricionFormGroupInput = IPlanesNutricion | PartialWithRequiredKeyOf<NewPlanesNutricion>;

type PlanesNutricionFormDefaults = Pick<NewPlanesNutricion, 'id'>;

type PlanesNutricionFormGroupContent = {
  id: FormControl<IPlanesNutricion['id'] | NewPlanesNutricion['id']>;
  nombrePlan: FormControl<IPlanesNutricion['nombrePlan']>;
  descripcion: FormControl<IPlanesNutricion['descripcion']>;
  instrucciones: FormControl<IPlanesNutricion['instrucciones']>;
  alimentosRecomendados: FormControl<IPlanesNutricion['alimentosRecomendados']>;
  user: FormControl<IPlanesNutricion['user']>;

};

export type PlanesNutricionFormGroup = FormGroup<PlanesNutricionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanesNutricionFormService {
  createPlanesNutricionFormGroup(planesNutricion: PlanesNutricionFormGroupInput = { id: null }): PlanesNutricionFormGroup {
    const planesNutricionRawValue = {
      ...this.getFormDefaults(),
      ...planesNutricion,
    };
    return new FormGroup<PlanesNutricionFormGroupContent>({
      id: new FormControl(
        { value: planesNutricionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombrePlan: new FormControl(planesNutricionRawValue.nombrePlan),
      descripcion: new FormControl(planesNutricionRawValue.descripcion),
      instrucciones: new FormControl(planesNutricionRawValue.instrucciones),
      alimentosRecomendados: new FormControl(planesNutricionRawValue.alimentosRecomendados),
      user: new FormControl(planesNutricionRawValue.user),
    });
  }

  getPlanesNutricion(form: PlanesNutricionFormGroup): IPlanesNutricion | NewPlanesNutricion {
    return form.getRawValue() as IPlanesNutricion | NewPlanesNutricion;
  }

  resetForm(form: PlanesNutricionFormGroup, planesNutricion: PlanesNutricionFormGroupInput): void {
    const planesNutricionRawValue = { ...this.getFormDefaults(), ...planesNutricion };
    form.reset(
      {
        ...planesNutricionRawValue,
        id: { value: planesNutricionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlanesNutricionFormDefaults {
    return {
      id: null,
    };
  }
}
