import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DeportesFormService } from './deportes-form.service';
import { DeportesService } from '../service/deportes.service';
import { IDeportes } from '../deportes.model';

import { DeportesUpdateComponent } from './deportes-update.component';

describe('Deportes Management Update Component', () => {
  let comp: DeportesUpdateComponent;
  let fixture: ComponentFixture<DeportesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let deportesFormService: DeportesFormService;
  let deportesService: DeportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DeportesUpdateComponent],
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
      .overrideTemplate(DeportesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeportesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    deportesFormService = TestBed.inject(DeportesFormService);
    deportesService = TestBed.inject(DeportesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const deportes: IDeportes = { id: 456 };

      activatedRoute.data = of({ deportes });
      comp.ngOnInit();

      expect(comp.deportes).toEqual(deportes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeportes>>();
      const deportes = { id: 123 };
      jest.spyOn(deportesFormService, 'getDeportes').mockReturnValue(deportes);
      jest.spyOn(deportesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deportes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deportes }));
      saveSubject.complete();

      // THEN
      expect(deportesFormService.getDeportes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(deportesService.update).toHaveBeenCalledWith(expect.objectContaining(deportes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeportes>>();
      const deportes = { id: 123 };
      jest.spyOn(deportesFormService, 'getDeportes').mockReturnValue({ id: null });
      jest.spyOn(deportesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deportes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: deportes }));
      saveSubject.complete();

      // THEN
      expect(deportesFormService.getDeportes).toHaveBeenCalled();
      expect(deportesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDeportes>>();
      const deportes = { id: 123 };
      jest.spyOn(deportesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ deportes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(deportesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
