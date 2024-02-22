import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { INutricion, NewNutricion } from '../nutricion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INutricion for edit and NewNutricionFormGroupInput for create.
 */
type NutricionFormGroupInput = INutricion | PartialWithRequiredKeyOf<NewNutricion>;

type NutricionFormDefaults = Pick<NewNutricion, 'id'>;

type NutricionFormGroupContent = {
  id: FormControl<INutricion['id'] | NewNutricion['id']>;
  nombrePlanNutricion: FormControl<INutricion['nombrePlanNutricion']>;
  descripcion: FormControl<INutricion['descripcion']>;
  tipoDieta: FormControl<INutricion['tipoDieta']>;
  alimentosRecomendados: FormControl<INutricion['alimentosRecomendados']>;
  instrucciones: FormControl<INutricion['instrucciones']>;
};

export type NutricionFormGroup = FormGroup<NutricionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NutricionFormService {
  createNutricionFormGroup(nutricion: NutricionFormGroupInput = { id: null }): NutricionFormGroup {
    const nutricionRawValue = {
      ...this.getFormDefaults(),
      ...nutricion,
    };
    return new FormGroup<NutricionFormGroupContent>({
      id: new FormControl(
        { value: nutricionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombrePlanNutricion: new FormControl(nutricionRawValue.nombrePlanNutricion),
      descripcion: new FormControl(nutricionRawValue.descripcion),
      tipoDieta: new FormControl(nutricionRawValue.tipoDieta),
      alimentosRecomendados: new FormControl(nutricionRawValue.alimentosRecomendados),
      instrucciones: new FormControl(nutricionRawValue.instrucciones),
    });
  }

  getNutricion(form: NutricionFormGroup): INutricion | NewNutricion {
    return form.getRawValue() as INutricion | NewNutricion;
  }

  resetForm(form: NutricionFormGroup, nutricion: NutricionFormGroupInput): void {
    const nutricionRawValue = { ...this.getFormDefaults(), ...nutricion };
    form.reset(
      {
        ...nutricionRawValue,
        id: { value: nutricionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): NutricionFormDefaults {
    return {
      id: null,
    };
  }
}
