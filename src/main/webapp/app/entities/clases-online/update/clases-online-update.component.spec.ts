import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ClasesOnlineFormService } from './clases-online-form.service';
import { ClasesOnlineService } from '../service/clases-online.service';
import { IClasesOnline } from '../clases-online.model';

import { ClasesOnlineUpdateComponent } from './clases-online-update.component';

describe('ClasesOnline Management Update Component', () => {
  let comp: ClasesOnlineUpdateComponent;
  let fixture: ComponentFixture<ClasesOnlineUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let clasesOnlineFormService: ClasesOnlineFormService;
  let clasesOnlineService: ClasesOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ClasesOnlineUpdateComponent],
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
      .overrideTemplate(ClasesOnlineUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClasesOnlineUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    clasesOnlineFormService = TestBed.inject(ClasesOnlineFormService);
    clasesOnlineService = TestBed.inject(ClasesOnlineService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const clasesOnline: IClasesOnline = { id: 456 };

      activatedRoute.data = of({ clasesOnline });
      comp.ngOnInit();

      expect(comp.clasesOnline).toEqual(clasesOnline);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasesOnline>>();
      const clasesOnline = { id: 123 };
      jest.spyOn(clasesOnlineFormService, 'getClasesOnline').mockReturnValue(clasesOnline);
      jest.spyOn(clasesOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clasesOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clasesOnline }));
      saveSubject.complete();

      // THEN
      expect(clasesOnlineFormService.getClasesOnline).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(clasesOnlineService.update).toHaveBeenCalledWith(expect.objectContaining(clasesOnline));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasesOnline>>();
      const clasesOnline = { id: 123 };
      jest.spyOn(clasesOnlineFormService, 'getClasesOnline').mockReturnValue({ id: null });
      jest.spyOn(clasesOnlineService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clasesOnline: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: clasesOnline }));
      saveSubject.complete();

      // THEN
      expect(clasesOnlineFormService.getClasesOnline).toHaveBeenCalled();
      expect(clasesOnlineService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasesOnline>>();
      const clasesOnline = { id: 123 };
      jest.spyOn(clasesOnlineService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ clasesOnline });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(clasesOnlineService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
