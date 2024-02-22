import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VideosClaseOnlineFormService } from './videos-clase-online-form.service';
import { VideosClaseOnlineService } from '../service/videos-clase-online.service';
import { IVideosClaseOnline } from '../videos-clase-online.model';
import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';

import { VideosClaseOnlineUpdateComponent } from './videos-clase-online-update.component';

describe('VideosClaseOnline Management Update Component', () => {
  let comp: VideosClaseOnlineUpdateComponent;
  let fixture: ComponentFixture<VideosClaseOnlineUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let videosClaseOnlineFormService: VideosClaseOnlineFormService;
  let videosClaseOnlineService: VideosClaseOnlineService;
  let clasesOnlineService: ClasesOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VideosClaseOnlineUpdateComponent],
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
      .overrideTemplate(VideosClaseOnlineUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VideosClaseOnlineUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    videosClaseOnlineFormService = TestBed.inject(VideosClaseOnlineFormService);
    videosClaseOnlineService = TestBed.inject(VideosClaseOnlineService);
    clasesOnlineService = TestBed.inject(ClasesOnlineService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ClasesOnline query and add missing value', () => {
      const videosClaseOnline: IVideosClaseOnline = { id: 456 };
      const claseOnline: IClasesOnline = { id: 71120 };
      videosClaseOnline.claseOnline = claseOnline;

      const clasesOnlineCollection: IClasesOnline[] = [{ id: 55873 }];
      jest.spyOn(clasesOnlineService, 'query').mockReturnValue(of(new HttpResponse({ body: clasesOnlineCollection })));
      const additionalClasesOnlines = [claseOnline];
      const expectedCollection: IClasesOnline[] = [...additionalClasesOnlines, ...clasesOnlineCollection];
      jest.spyOn(clasesOnlineService, 'addClasesOnlineToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ videosClaseOnline });
      comp.ngOnInit();

      expect(clasesOnlineService.query).toHaveBeenCalled();
      expect(clasesOnlineService.addClasesOnlineToCollectionIfMissing).toHaveBeenCalledWith(
        clasesOnlineCollection,
        ...additionalClasesOnlines.map(expect.objectContaining)
      );
      expect(comp.clasesOnlinesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const videosClaseOnline: IVideosClaseOnline = { id: 456 };
      const claseOnline: IClasesOnline = { id: 67256 };
      videosClaseOnline.claseOnline = claseOnline;

      activatedRoute.data = of({ videosClaseOnline });
      comp.ngOnInit();

      expect(comp.clasesOnlinesSharedCollection).toContain(claseOnline);
      expect(comp.videosClaseOnline).toEqual(videosClaseOnline);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosClaseOnline>>();
      const videosClaseOnline = { id: 123 };
      jest.spyOn(videosClaseOnlineFormService, 'getVideosClaseOnline').mockReturnValue(videosClaseOnline);
      jest.spyOn(videosClaseOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosClaseOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: videosClaseOnline }));
      saveSubject.complete();

      // THEN
      expect(videosClaseOnlineFormService.getVideosClaseOnline).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(videosClaseOnlineService.update).toHaveBeenCalledWith(expect.objectContaining(videosClaseOnline));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosClaseOnline>>();
      const videosClaseOnline = { id: 123 };
      jest.spyOn(videosClaseOnlineFormService, 'getVideosClaseOnline').mockReturnValue({ id: null });
      jest.spyOn(videosClaseOnlineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosClaseOnline: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: videosClaseOnline }));
      saveSubject.complete();

      // THEN
      expect(videosClaseOnlineFormService.getVideosClaseOnline).toHaveBeenCalled();
      expect(videosClaseOnlineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVideosClaseOnline>>();
      const videosClaseOnline = { id: 123 };
      jest.spyOn(videosClaseOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ videosClaseOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(videosClaseOnlineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClasesOnline', () => {
      it('Should forward to clasesOnlineService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clasesOnlineService, 'compareClasesOnline');
        comp.compareClasesOnline(entity, entity2);
        expect(clasesOnlineService.compareClasesOnline).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
