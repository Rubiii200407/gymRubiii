import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../planes-nutricion.test-samples';

import { PlanesNutricionFormService } from './planes-nutricion-form.service';

describe('PlanesNutricion Form Service', () => {
  let service: PlanesNutricionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesNutricionFormService);
  });

  describe('Service methods', () => {
    describe('createPlanesNutricionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPlanesNutricionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlan: expect.any(Object),
            descripcion: expect.any(Object),
            tipo: expect.any(Object),
            duracion: expect.any(Object),
            instrucciones: expect.any(Object),
            planNutricion: expect.any(Object),
            planEntrenamiento: expect.any(Object),
          })
        );
      });

      it('passing IPlanesNutricion should create a new form with FormGroup', () => {
        const formGroup = service.createPlanesNutricionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlan: expect.any(Object),
            descripcion: expect.any(Object),
            tipo: expect.any(Object),
            duracion: expect.any(Object),
            instrucciones: expect.any(Object),
            planNutricion: expect.any(Object),
            planEntrenamiento: expect.any(Object),
          })
        );
      });
    });

    describe('getPlanesNutricion', () => {
      it('should return NewPlanesNutricion for default PlanesNutricion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPlanesNutricionFormGroup(sampleWithNewData);

        const planesNutricion = service.getPlanesNutricion(formGroup) as any;

        expect(planesNutricion).toMatchObject(sampleWithNewData);
      });

      it('should return NewPlanesNutricion for empty PlanesNutricion initial value', () => {
        const formGroup = service.createPlanesNutricionFormGroup();

        const planesNutricion = service.getPlanesNutricion(formGroup) as any;

        expect(planesNutricion).toMatchObject({});
      });

      it('should return IPlanesNutricion', () => {
        const formGroup = service.createPlanesNutricionFormGroup(sampleWithRequiredData);

        const planesNutricion = service.getPlanesNutricion(formGroup) as any;

        expect(planesNutricion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPlanesNutricion should not enable id FormControl', () => {
        const formGroup = service.createPlanesNutricionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPlanesNutricion should disable id FormControl', () => {
        const formGroup = service.createPlanesNutricionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
