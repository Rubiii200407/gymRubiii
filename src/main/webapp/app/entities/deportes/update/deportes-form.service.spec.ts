import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../deportes.test-samples';

import { DeportesFormService } from './deportes-form.service';

describe('Deportes Form Service', () => {
  let service: DeportesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeportesFormService);
  });

  describe('Service methods', () => {
    describe('createDeportesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDeportesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreDeporte: expect.any(Object),
            descripcion: expect.any(Object),
            horariosDisponibles: expect.any(Object),
            participantesInscritos: expect.any(Object),
          })
        );
      });

      it('passing IDeportes should create a new form with FormGroup', () => {
        const formGroup = service.createDeportesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreDeporte: expect.any(Object),
            descripcion: expect.any(Object),
            horariosDisponibles: expect.any(Object),
            participantesInscritos: expect.any(Object),
          })
        );
      });
    });

    describe('getDeportes', () => {
      it('should return NewDeportes for default Deportes initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDeportesFormGroup(sampleWithNewData);

        const deportes = service.getDeportes(formGroup) as any;

        expect(deportes).toMatchObject(sampleWithNewData);
      });

      it('should return NewDeportes for empty Deportes initial value', () => {
        const formGroup = service.createDeportesFormGroup();

        const deportes = service.getDeportes(formGroup) as any;

        expect(deportes).toMatchObject({});
      });

      it('should return IDeportes', () => {
        const formGroup = service.createDeportesFormGroup(sampleWithRequiredData);

        const deportes = service.getDeportes(formGroup) as any;

        expect(deportes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDeportes should not enable id FormControl', () => {
        const formGroup = service.createDeportesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDeportes should disable id FormControl', () => {
        const formGroup = service.createDeportesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
