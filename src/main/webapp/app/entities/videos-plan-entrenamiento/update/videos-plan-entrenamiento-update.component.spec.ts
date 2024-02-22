import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VideosPlanEntrenamientoFormService } from './videos-plan-entrenamiento-form.service';
import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';
import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';

import { VideosPlanEntrenamientoUpdateComponent } from './videos-plan-entrenamiento-update.component';

describe('VideosPlanEntrenamiento Management Update Component', () => {
  let comp: VideosPlanEntrenamientoUpdateComponent;
  let fixture: ComponentFixture<VideosPlanEntrenamientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let videosPlanEntrenamientoFormService: VideosPlanEntrenamientoFormService;
  let videosPlanEntrenamientoService: VideosPlanEntrenamientoService;
  let planesEntrenamientoService: PlanesEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VideosPlanEntrenamientoUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(VideosPlanEntrenamientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VideosPlanEntrenamientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    videosPlanEntrenamientoFormService = TestBed.inject(VideosPlanEntrenamientoFormService);
    videosPlanEntrenamientoService = TestBed.inject(VideosPlanEntrenamientoService);
    planesEntrenamientoService = TestBed.inject(PlanesEntrenamientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call PlanesEntrenamiento query and add missing value', () => {
      const videosPlanEntrenamiento: IVideosPlanEntrenamiento = { id: 456 };
      const planEntrenamiento: IPlanesEntrenamiento = { id: 98582 };
      videosPlanEntrenamiento.planEntrenamiento = planEntrenamiento;

      const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [{ id: 21645 }];
      jest.spyOn(planesEntrenamientoService, 'query').mockReturnValue(of(new HttpResponse({ body: planesEntrenamientoCollection })));
      const additionalPlanesEntrenamientos = [planEntrenamiento];
      const expectedCollection: IPlanesEntrenamiento[] = [...additionalPlanesEntrenamientos, ...planesEntrenamientoCollection];
      jest.spyOn(planesEntrenamientoService, 'addPlanesEntrenamientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ videosPlanEntrenamiento });
      comp.ngOnInit();

      expect(planesEntrenamientoService.query).toHaveBeenCalled();
      expect(planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing).toHaveBeenCalledWith(
        planesEntrenamientoCollection,
        ...additionalPlanesEntrenamientos.map(expect.objectContaining)
      );
      expect(comp.planesEntrenamientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const videosPlanEntrenamiento: IVideosPlanEntrenamiento = { id: 456 };
      const planEntrenamiento: IPlanesEntrenamiento = { id: 37933 };
      videosPlanEntrenamiento.planEntrenamiento = planEntrenamiento;

      activatedRoute.data = of({ videosPlanEntrenamiento });
      comp.ngOnInit();

      expect(comp.planesEntrenamientosSharedCollection).toContain(planEntrenamiento);
      expect(comp.videosPlanEntrenamiento).toEqual(videosPlanEntrenamiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosPlanEntrenamiento>>();
      const videosPlanEntrenamiento = { id: 123 };
      jest.spyOn(videosPlanEntrenamientoFormService, 'getVideosPlanEntrenamiento').mockReturnValue(videosPlanEntrenamiento);
      jest.spyOn(videosPlanEntrenamientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosPlanEntrenamiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: videosPlanEntrenamiento }));
      saveSubject.complete();

      // THEN
      expect(videosPlanEntrenamientoFormService.getVideosPlanEntrenamiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(videosPlanEntrenamientoService.update).toHaveBeenCalledWith(expect.objectContaining(videosPlanEntrenamiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosPlanEntrenamiento>>();
      const videosPlanEntrenamiento = { id: 123 };
      jest.spyOn(videosPlanEntrenamientoFormService, 'getVideosPlanEntrenamiento').mockReturnValue({ id: null });
      jest.spyOn(videosPlanEntrenamientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosPlanEntrenamiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: videosPlanEntrenamiento }));
      saveSubject.complete();

      // THEN
      expect(videosPlanEntrenamientoFormService.getVideosPlanEntrenamiento).toHaveBeenCalled();
      expect(videosPlanEntrenamientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosPlanEntrenamiento>>();
      const videosPlanEntrenamiento = { id: 123 };
      jest.spyOn(videosPlanEntrenamientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosPlanEntrenamiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(videosPlanEntrenamientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePlanesEntrenamiento', () => {
      it('Should forward to planesEntrenamientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(planesEntrenamientoService, 'comparePlanesEntrenamiento');
        comp.comparePlanesEntrenamiento(entity, entity2);
        expect(planesEntrenamientoService.comparePlanesEntrenamiento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
