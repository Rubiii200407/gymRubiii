import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPlanNutricionEntrenamiento, NewPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';



/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPlanNutricionEntrenamiento for edit and NewPlanNutricionEntrenamientoFormGroupInput for create.
 */
type PlanNutricionEntrenamientoFormGroupInput = IPlanNutricionEntrenamiento | PartialWithRequiredKeyOf<NewPlanNutricionEntrenamiento>;

type PlanNutricionEntrenamientoFormDefaults = Pick<NewPlanNutricionEntrenamiento, 'id'>;

type PlanNutricionEntrenamientoFormGroupContent = {
  id: FormControl<IPlanNutricionEntrenamiento['id'] | NewPlanNutricionEntrenamiento['id']>;
  nombrePlan: FormControl<IPlanNutricionEntrenamiento['nombrePlan']>;
  instrucciones: FormControl<IPlanNutricionEntrenamiento['instrucciones']>;
  video: FormControl<IPlanNutricionEntrenamiento['video']>;
};

export type PlanNutricionEntrenamientoFormGroup = FormGroup<PlanNutricionEntrenamientoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PlanNutricionEntrenamientoFormService {
  createPlanNutricionEntrenamientoFormGroup(planNutricionEntrenamiento: PlanNutricionEntrenamientoFormGroupInput = { id: null }): PlanNutricionEntrenamientoFormGroup {
    const planNutricionEntrenamientoRawValue = {
      ...this.getFormDefaults(),
      ...planNutricionEntrenamiento,
    };
    return new FormGroup<PlanNutricionEntrenamientoFormGroupContent>({
      id: new FormControl(
        { value: planNutricionEntrenamientoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombrePlan: new FormControl(planNutricionEntrenamientoRawValue.nombrePlan),
      instrucciones: new FormControl(planNutricionEntrenamientoRawValue.instrucciones),
      video: new FormControl(planNutricionEntrenamientoRawValue.video),

    });
  }

  getPlanNutricionEntrenamiento(form: PlanNutricionEntrenamientoFormGroup): IPlanNutricionEntrenamiento | NewPlanNutricionEntrenamiento {
    return form.getRawValue() as IPlanNutricionEntrenamiento | NewPlanNutricionEntrenamiento;
  }

  resetForm(form: PlanNutricionEntrenamientoFormGroup, planNutricionEntrenamiento: PlanNutricionEntrenamientoFormGroupInput): void {
    const planNutricionEntrenamientoRawValue = { ...this.getFormDefaults(), ...planNutricionEntrenamiento };
    form.reset(
      {
        ...planNutricionEntrenamientoRawValue,
        id: { value: planNutricionEntrenamientoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PlanNutricionEntrenamientoFormDefaults {
    return {
      id: null,
    };
  }
}
