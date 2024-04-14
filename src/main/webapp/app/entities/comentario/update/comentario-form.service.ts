import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IComentario, NewComentario } from '../comentario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IComentario for edit and NewComentarioFormGroupInput for create.
 */
type ComentarioFormGroupInput = IComentario | PartialWithRequiredKeyOf<NewComentario>;

type ComentarioFormDefaults = Pick<NewComentario, 'id'>;

type ComentarioFormGroupContent = {
  id: FormControl<IComentario['id'] | NewComentario['id']>;
  descripcion: FormControl<IComentario['descripcion']>;
  fechaCreacion: FormControl<IComentario['fechaCreacion']>;
  creador: FormControl<IComentario['creador']>;
  deportes: FormControl<IComentario['deportes']>;
  clasesOnline: FormControl<IComentario['clasesOnline']>;
  planesNutricion: FormControl<IComentario['planesNutricion']>;
  planesEntrenamiento: FormControl<IComentario['planesEntrenamiento']>;
};

export type ComentarioFormGroup = FormGroup<ComentarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ComentarioFormService {
  createComentarioFormGroup(comentario: ComentarioFormGroupInput = { id: null }): ComentarioFormGroup {
    const comentarioRawValue = {
      ...this.getFormDefaults(),
      ...comentario,
    };
    return new FormGroup<ComentarioFormGroupContent>({
      id: new FormControl(
        { value: comentarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      descripcion: new FormControl(comentarioRawValue.descripcion),
      fechaCreacion: new FormControl(comentarioRawValue.fechaCreacion),
      creador: new FormControl(comentarioRawValue.creador),
      deportes: new FormControl(comentarioRawValue.deportes),
      clasesOnline: new FormControl(comentarioRawValue.clasesOnline),
      planesNutricion: new FormControl(comentarioRawValue.planesNutricion),
      planesEntrenamiento: new FormControl(comentarioRawValue.planesEntrenamiento),
    });
  }

  getComentario(form: ComentarioFormGroup): IComentario | NewComentario {
    return form.getRawValue() as IComentario | NewComentario;
  }

  resetForm(form: ComentarioFormGroup, comentario: ComentarioFormGroupInput): void {
    const comentarioRawValue = { ...this.getFormDefaults(), ...comentario };
    form.reset(
      {
        ...comentarioRawValue,
        id: { value: comentarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ComentarioFormDefaults {
    return {
      id: null,
    };
  }
}
