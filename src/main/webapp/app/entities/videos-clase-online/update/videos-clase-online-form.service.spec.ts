import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../videos-clase-online.test-samples';

import { VideosClaseOnlineFormService } from './videos-clase-online-form.service';

describe('VideosClaseOnline Form Service', () => {
  let service: VideosClaseOnlineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosClaseOnlineFormService);
  });

  describe('Service methods', () => {
    describe('createVideosClaseOnlineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tituloVideo: expect.any(Object),
            descripcionVideo: expect.any(Object),
            urlVideo: expect.any(Object),
            duracion: expect.any(Object),
            claseOnline: expect.any(Object),
          })
        );
      });

      it('passing IVideosClaseOnline should create a new form with FormGroup', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tituloVideo: expect.any(Object),
            descripcionVideo: expect.any(Object),
            urlVideo: expect.any(Object),
            duracion: expect.any(Object),
            claseOnline: expect.any(Object),
          })
        );
      });
    });

    describe('getVideosClaseOnline', () => {
      it('should return NewVideosClaseOnline for default VideosClaseOnline initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createVideosClaseOnlineFormGroup(sampleWithNewData);

        const videosClaseOnline = service.getVideosClaseOnline(formGroup) as any;

        expect(videosClaseOnline).toMatchObject(sampleWithNewData);
      });

      it('should return NewVideosClaseOnline for empty VideosClaseOnline initial value', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup();

        const videosClaseOnline = service.getVideosClaseOnline(formGroup) as any;

        expect(videosClaseOnline).toMatchObject({});
      });

      it('should return IVideosClaseOnline', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup(sampleWithRequiredData);

        const videosClaseOnline = service.getVideosClaseOnline(formGroup) as any;

        expect(videosClaseOnline).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVideosClaseOnline should not enable id FormControl', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVideosClaseOnline should disable id FormControl', () => {
        const formGroup = service.createVideosClaseOnlineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
