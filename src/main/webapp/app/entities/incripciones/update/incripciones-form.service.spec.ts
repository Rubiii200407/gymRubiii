import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../incripciones.test-samples';

import { IncripcionesFormService } from './incripciones-form.service';

describe('Incripciones Form Service', () => {
  let service: IncripcionesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncripcionesFormService);
  });

  describe('Service methods', () => {
    describe('createIncripcionesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIncripcionesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreUsuario: expect.any(Object),
            tipoEvento: expect.any(Object),
            nombreEvento: expect.any(Object),
            fechaInscripcion: expect.any(Object),
            claseOnline: expect.any(Object),
            deporte: expect.any(Object),
          })
        );
      });

      it('passing IIncripciones should create a new form with FormGroup', () => {
        const formGroup = service.createIncripcionesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreUsuario: expect.any(Object),
            tipoEvento: expect.any(Object),
            nombreEvento: expect.any(Object),
            fechaInscripcion: expect.any(Object),
            claseOnline: expect.any(Object),
            deporte: expect.any(Object),
          })
        );
      });
    });

    describe('getIncripciones', () => {
      it('should return NewIncripciones for default Incripciones initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIncripcionesFormGroup(sampleWithNewData);

        const incripciones = service.getIncripciones(formGroup) as any;

        expect(incripciones).toMatchObject(sampleWithNewData);
      });

      it('should return NewIncripciones for empty Incripciones initial value', () => {
        const formGroup = service.createIncripcionesFormGroup();

        const incripciones = service.getIncripciones(formGroup) as any;

        expect(incripciones).toMatchObject({});
      });

      it('should return IIncripciones', () => {
        const formGroup = service.createIncripcionesFormGroup(sampleWithRequiredData);

        const incripciones = service.getIncripciones(formGroup) as any;

        expect(incripciones).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIncripciones should not enable id FormControl', () => {
        const formGroup = service.createIncripcionesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIncripciones should disable id FormControl', () => {
        const formGroup = service.createIncripcionesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
