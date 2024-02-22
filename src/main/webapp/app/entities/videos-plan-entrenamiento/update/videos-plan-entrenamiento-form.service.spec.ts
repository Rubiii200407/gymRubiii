import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../videos-plan-entrenamiento.test-samples';

import { VideosPlanEntrenamientoFormService } from './videos-plan-entrenamiento-form.service';

describe('VideosPlanEntrenamiento Form Service', () => {
  let service: VideosPlanEntrenamientoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosPlanEntrenamientoFormService);
  });

  describe('Service methods', () => {
    describe('createVideosPlanEntrenamientoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tituloVideo: expect.any(Object),
            descripcionVideo: expect.any(Object),
            urlVideo: expect.any(Object),
            duracion: expect.any(Object),
            fechaPublicacion: expect.any(Object),
            planEntrenamiento: expect.any(Object),
          })
        );
      });

      it('passing IVideosPlanEntrenamiento should create a new form with FormGroup', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tituloVideo: expect.any(Object),
            descripcionVideo: expect.any(Object),
            urlVideo: expect.any(Object),
            duracion: expect.any(Object),
            fechaPublicacion: expect.any(Object),
            planEntrenamiento: expect.any(Object),
          })
        );
      });
    });

    describe('getVideosPlanEntrenamiento', () => {
      it('should return NewVideosPlanEntrenamiento for default VideosPlanEntrenamiento initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVideosPlanEntrenamientoFormGroup(sampleWithNewData);

        const videosPlanEntrenamiento = service.getVideosPlanEntrenamiento(formGroup) as any;

        expect(videosPlanEntrenamiento).toMatchObject(sampleWithNewData);
      });

      it('should return NewVideosPlanEntrenamiento for empty VideosPlanEntrenamiento initial value', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup();

        const videosPlanEntrenamiento = service.getVideosPlanEntrenamiento(formGroup) as any;

        expect(videosPlanEntrenamiento).toMatchObject({});
      });

      it('should return IVideosPlanEntrenamiento', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup(sampleWithRequiredData);

        const videosPlanEntrenamiento = service.getVideosPlanEntrenamiento(formGroup) as any;

        expect(videosPlanEntrenamiento).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVideosPlanEntrenamiento should not enable id FormControl', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVideosPlanEntrenamiento should disable id FormControl', () => {
        const formGroup = service.createVideosPlanEntrenamientoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
