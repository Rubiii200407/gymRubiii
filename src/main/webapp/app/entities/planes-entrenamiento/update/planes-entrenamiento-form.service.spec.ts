import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../planes-entrenamiento.test-samples';

import { PlanesEntrenamientoFormService } from './planes-entrenamiento-form.service';

describe('PlanesEntrenamiento Form Service', () => {
  let service: PlanesEntrenamientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesEntrenamientoFormService);
  });

  describe('Service methods', () => {
    describe('createPlanesEntrenamientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlan: expect.any(Object),
            descripcion: expect.any(Object),
            tipo: expect.any(Object),
            duracion: expect.any(Object),
            instrucciones: expect.any(Object),
          })
        );
      });

      it('passing IPlanesEntrenamiento should create a new form with FormGroup', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlan: expect.any(Object),
            descripcion: expect.any(Object),
            tipo: expect.any(Object),
            duracion: expect.any(Object),
            instrucciones: expect.any(Object),
          })
        );
      });
    });

    describe('getPlanesEntrenamiento', () => {
      it('should return NewPlanesEntrenamiento for default PlanesEntrenamiento initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlanesEntrenamientoFormGroup(sampleWithNewData);

        const planesEntrenamiento = service.getPlanesEntrenamiento(formGroup) as any;

        expect(planesEntrenamiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlanesEntrenamiento for empty PlanesEntrenamiento initial value', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup();

        const planesEntrenamiento = service.getPlanesEntrenamiento(formGroup) as any;

        expect(planesEntrenamiento).toMatchObject({});
      });

      it('should return IPlanesEntrenamiento', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup(sampleWithRequiredData);

        const planesEntrenamiento = service.getPlanesEntrenamiento(formGroup) as any;

        expect(planesEntrenamiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlanesEntrenamiento should not enable id FormControl', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlanesEntrenamiento should disable id FormControl', () => {
        const formGroup = service.createPlanesEntrenamientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
