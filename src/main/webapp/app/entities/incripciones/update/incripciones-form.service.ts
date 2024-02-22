import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IIncripciones, NewIncripciones } from '../incripciones.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIncripciones for edit and NewIncripcionesFormGroupInput for create.
 */
type IncripcionesFormGroupInput = IIncripciones | PartialWithRequiredKeyOf<NewIncripciones>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IIncripciones | NewIncripciones> = Omit<T, 'fechaInscripcion'> & {
  fechaInscripcion?: string | null;
};

type IncripcionesFormRawValue = FormValueOf<IIncripciones>;

type NewIncripcionesFormRawValue = FormValueOf<NewIncripciones>;

type IncripcionesFormDefaults = Pick<NewIncripciones, 'id' | 'fechaInscripcion'>;

type IncripcionesFormGroupContent = {
  id: FormControl<IncripcionesFormRawValue['id'] | NewIncripciones['id']>;
  nombreUsuario: FormControl<IncripcionesFormRawValue['nombreUsuario']>;
  tipoEvento: FormControl<IncripcionesFormRawValue['tipoEvento']>;
  nombreEvento: FormControl<IncripcionesFormRawValue['nombreEvento']>;
  fechaInscripcion: FormControl<IncripcionesFormRawValue['fechaInscripcion']>;
  claseOnline: FormControl<IncripcionesFormRawValue['claseOnline']>;
  deporte: FormControl<IncripcionesFormRawValue['deporte']>;
};

export type IncripcionesFormGroup = FormGroup<IncripcionesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IncripcionesFormService {
  createIncripcionesFormGroup(incripciones: IncripcionesFormGroupInput = { id: null }): IncripcionesFormGroup {
    const incripcionesRawValue = this.convertIncripcionesToIncripcionesRawValue({
      ...this.getFormDefaults(),
      ...incripciones,
    });
    return new FormGroup<IncripcionesFormGroupContent>({
      id: new FormControl(
        { value: incripcionesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      nombreUsuario: new FormControl(incripcionesRawValue.nombreUsuario),
      tipoEvento: new FormControl(incripcionesRawValue.tipoEvento),
      nombreEvento: new FormControl(incripcionesRawValue.nombreEvento),
      fechaInscripcion: new FormControl(incripcionesRawValue.fechaInscripcion),
      claseOnline: new FormControl(incripcionesRawValue.claseOnline),
      deporte: new FormControl(incripcionesRawValue.deporte),
    });
  }

  getIncripciones(form: IncripcionesFormGroup): IIncripciones | NewIncripciones {
    return this.convertIncripcionesRawValueToIncripciones(form.getRawValue() as IncripcionesFormRawValue | NewIncripcionesFormRawValue);
  }

  resetForm(form: IncripcionesFormGroup, incripciones: IncripcionesFormGroupInput): void {
    const incripcionesRawValue = this.convertIncripcionesToIncripcionesRawValue({ ...this.getFormDefaults(), ...incripciones });
    form.reset(
      {
        ...incripcionesRawValue,
        id: { value: incripcionesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IncripcionesFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fechaInscripcion: currentTime,
    };
  }

  private convertIncripcionesRawValueToIncripciones(
    rawIncripciones: IncripcionesFormRawValue | NewIncripcionesFormRawValue
  ): IIncripciones | NewIncripciones {
    return {
      ...rawIncripciones,
      fechaInscripcion: dayjs(rawIncripciones.fechaInscripcion, DATE_TIME_FORMAT),
    };
  }

  private convertIncripcionesToIncripcionesRawValue(
    incripciones: IIncripciones | (Partial<NewIncripciones> & IncripcionesFormDefaults)
  ): IncripcionesFormRawValue | PartialWithRequiredKeyOf<NewIncripcionesFormRawValue> {
    return {
      ...incripciones,
      fechaInscripcion: incripciones.fechaInscripcion ? incripciones.fechaInscripcion.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
