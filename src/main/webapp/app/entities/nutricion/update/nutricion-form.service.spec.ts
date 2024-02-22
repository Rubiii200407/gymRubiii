import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nutricion.test-samples';

import { NutricionFormService } from './nutricion-form.service';

describe('Nutricion Form Service', () => {
  let service: NutricionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutricionFormService);
  });

  describe('Service methods', () => {
    describe('createNutricionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNutricionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlanNutricion: expect.any(Object),
            descripcion: expect.any(Object),
            tipoDieta: expect.any(Object),
            alimentosRecomendados: expect.any(Object),
            instrucciones: expect.any(Object),
          })
        );
      });

      it('passing INutricion should create a new form with FormGroup', () => {
        const formGroup = service.createNutricionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombrePlanNutricion: expect.any(Object),
            descripcion: expect.any(Object),
            tipoDieta: expect.any(Object),
            alimentosRecomendados: expect.any(Object),
            instrucciones: expect.any(Object),
          })
        );
      });
    });

    describe('getNutricion', () => {
      it('should return NewNutricion for default Nutricion initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createNutricionFormGroup(sampleWithNewData);

        const nutricion = service.getNutricion(formGroup) as any;

        expect(nutricion).toMatchObject(sampleWithNewData);
      });

      it('should return NewNutricion for empty Nutricion initial value', () => {
        const formGroup = service.createNutricionFormGroup();

        const nutricion = service.getNutricion(formGroup) as any;

        expect(nutricion).toMatchObject({});
      });

      it('should return INutricion', () => {
        const formGroup = service.createNutricionFormGroup(sampleWithRequiredData);

        const nutricion = service.getNutricion(formGroup) as any;

        expect(nutricion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INutricion should not enable id FormControl', () => {
        const formGroup = service.createNutricionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNutricion should disable id FormControl', () => {
        const formGroup = service.createNutricionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
