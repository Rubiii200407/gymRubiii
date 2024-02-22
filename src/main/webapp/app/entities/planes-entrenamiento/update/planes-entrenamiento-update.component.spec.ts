import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlanesEntrenamientoFormService } from './planes-entrenamiento-form.service';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';
import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';

import { PlanesEntrenamientoUpdateComponent } from './planes-entrenamiento-update.component';

describe('PlanesEntrenamiento Management Update Component', () => {
  let comp: PlanesEntrenamientoUpdateComponent;
  let fixture: ComponentFixture<PlanesEntrenamientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planesEntrenamientoFormService: PlanesEntrenamientoFormService;
  let planesEntrenamientoService: PlanesEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlanesEntrenamientoUpdateComponent],
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
      .overrideTemplate(PlanesEntrenamientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesEntrenamientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planesEntrenamientoFormService = TestBed.inject(PlanesEntrenamientoFormService);
    planesEntrenamientoService = TestBed.inject(PlanesEntrenamientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const planesEntrenamiento: IPlanesEntrenamiento = { id: 456 };

      activatedRoute.data = of({ planesEntrenamiento });
      comp.ngOnInit();

      expect(comp.planesEntrenamiento).toEqual(planesEntrenamiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesEntrenamiento>>();
      const planesEntrenamiento = { id: 123 };
      jest.spyOn(planesEntrenamientoFormService, 'getPlanesEntrenamiento').mockReturnValue(planesEntrenamiento);
      jest.spyOn(planesEntrenamientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesEntrenamiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesEntrenamiento }));
      saveSubject.complete();

      // THEN
      expect(planesEntrenamientoFormService.getPlanesEntrenamiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(planesEntrenamientoService.update).toHaveBeenCalledWith(expect.objectContaining(planesEntrenamiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesEntrenamiento>>();
      const planesEntrenamiento = { id: 123 };
      jest.spyOn(planesEntrenamientoFormService, 'getPlanesEntrenamiento').mockReturnValue({ id: null });
      jest.spyOn(planesEntrenamientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesEntrenamiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesEntrenamiento }));
      saveSubject.complete();

      // THEN
      expect(planesEntrenamientoFormService.getPlanesEntrenamiento).toHaveBeenCalled();
      expect(planesEntrenamientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesEntrenamiento>>();
      const planesEntrenamiento = { id: 123 };
      jest.spyOn(planesEntrenamientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesEntrenamiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planesEntrenamientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
