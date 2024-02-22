import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../clases-online.test-samples';

import { ClasesOnlineFormService } from './clases-online-form.service';

describe('ClasesOnline Form Service', () => {
  let service: ClasesOnlineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesOnlineFormService);
  });

  describe('Service methods', () => {
    describe('createClasesOnlineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createClasesOnlineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreClase: expect.any(Object),
            descripcion: expect.any(Object),
            horario: expect.any(Object),
            instructor: expect.any(Object),
            capacidad: expect.any(Object),
            participantesInscritos: expect.any(Object),
          })
        );
      });

      it('passing IClasesOnline should create a new form with FormGroup', () => {
        const formGroup = service.createClasesOnlineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreClase: expect.any(Object),
            descripcion: expect.any(Object),
            horario: expect.any(Object),
            instructor: expect.any(Object),
            capacidad: expect.any(Object),
            participantesInscritos: expect.any(Object),
          })
        );
      });
    });

    describe('getClasesOnline', () => {
      it('should return NewClasesOnline for default ClasesOnline initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createClasesOnlineFormGroup(sampleWithNewData);

        const clasesOnline = service.getClasesOnline(formGroup) as any;

        expect(clasesOnline).toMatchObject(sampleWithNewData);
      });

      it('should return NewClasesOnline for empty ClasesOnline initial value', () => {
        const formGroup = service.createClasesOnlineFormGroup();

        const clasesOnline = service.getClasesOnline(formGroup) as any;

        expect(clasesOnline).toMatchObject({});
      });

      it('should return IClasesOnline', () => {
        const formGroup = service.createClasesOnlineFormGroup(sampleWithRequiredData);

        const clasesOnline = service.getClasesOnline(formGroup) as any;

        expect(clasesOnline).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IClasesOnline should not enable id FormControl', () => {
        const formGroup = service.createClasesOnlineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewClasesOnline should disable id FormControl', () => {
        const formGroup = service.createClasesOnlineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
