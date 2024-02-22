import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { NutricionFormService } from './nutricion-form.service';
import { NutricionService } from '../service/nutricion.service';
import { INutricion } from '../nutricion.model';

import { NutricionUpdateComponent } from './nutricion-update.component';

describe('Nutricion Management Update Component', () => {
  let comp: NutricionUpdateComponent;
  let fixture: ComponentFixture<NutricionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let nutricionFormService: NutricionFormService;
  let nutricionService: NutricionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [NutricionUpdateComponent],
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
      .overrideTemplate(NutricionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NutricionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    nutricionFormService = TestBed.inject(NutricionFormService);
    nutricionService = TestBed.inject(NutricionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const nutricion: INutricion = { id: 456 };

      activatedRoute.data = of({ nutricion });
      comp.ngOnInit();

      expect(comp.nutricion).toEqual(nutricion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutricion>>();
      const nutricion = { id: 123 };
      jest.spyOn(nutricionFormService, 'getNutricion').mockReturnValue(nutricion);
      jest.spyOn(nutricionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutricion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutricion }));
      saveSubject.complete();

      // THEN
      expect(nutricionFormService.getNutricion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(nutricionService.update).toHaveBeenCalledWith(expect.objectContaining(nutricion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutricion>>();
      const nutricion = { id: 123 };
      jest.spyOn(nutricionFormService, 'getNutricion').mockReturnValue({ id: null });
      jest.spyOn(nutricionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutricion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: nutricion }));
      saveSubject.complete();

      // THEN
      expect(nutricionFormService.getNutricion).toHaveBeenCalled();
      expect(nutricionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INutricion>>();
      const nutricion = { id: 123 };
      jest.spyOn(nutricionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ nutricion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(nutricionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
