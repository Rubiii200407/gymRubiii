import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IncripcionesFormService } from './incripciones-form.service';
import { IncripcionesService } from '../service/incripciones.service';
import { IIncripciones } from '../incripciones.model';
import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { IDeportes } from 'app/entities/deportes/deportes.model';
import { DeportesService } from 'app/entities/deportes/service/deportes.service';

import { IncripcionesUpdateComponent } from './incripciones-update.component';

describe('Incripciones Management Update Component', () => {
  let comp: IncripcionesUpdateComponent;
  let fixture: ComponentFixture<IncripcionesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let incripcionesFormService: IncripcionesFormService;
  let incripcionesService: IncripcionesService;
  let clasesOnlineService: ClasesOnlineService;
  let deportesService: DeportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IncripcionesUpdateComponent],
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
      .overrideTemplate(IncripcionesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IncripcionesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    incripcionesFormService = TestBed.inject(IncripcionesFormService);
    incripcionesService = TestBed.inject(IncripcionesService);
    clasesOnlineService = TestBed.inject(ClasesOnlineService);
    deportesService = TestBed.inject(DeportesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ClasesOnline query and add missing value', () => {
      const incripciones: IIncripciones = { id: 456 };
      const claseOnline: IClasesOnline = { id: 89892 };
      incripciones.claseOnline = claseOnline;

      const clasesOnlineCollection: IClasesOnline[] = [{ id: 92559 }];
      jest.spyOn(clasesOnlineService, 'query').mockReturnValue(of(new HttpResponse({ body: clasesOnlineCollection })));
      const additionalClasesOnlines = [claseOnline];
      const expectedCollection: IClasesOnline[] = [...additionalClasesOnlines, ...clasesOnlineCollection];
      jest.spyOn(clasesOnlineService, 'addClasesOnlineToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ incripciones });
      comp.ngOnInit();

      expect(clasesOnlineService.query).toHaveBeenCalled();
      expect(clasesOnlineService.addClasesOnlineToCollectionIfMissing).toHaveBeenCalledWith(
        clasesOnlineCollection,
        ...additionalClasesOnlines.map(expect.objectContaining)
      );
      expect(comp.clasesOnlinesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Deportes query and add missing value', () => {
      const incripciones: IIncripciones = { id: 456 };
      const deporte: IDeportes = { id: 62887 };
      incripciones.deporte = deporte;

      const deportesCollection: IDeportes[] = [{ id: 11931 }];
      jest.spyOn(deportesService, 'query').mockReturnValue(of(new HttpResponse({ body: deportesCollection })));
      const additionalDeportes = [deporte];
      const expectedCollection: IDeportes[] = [...additionalDeportes, ...deportesCollection];
      jest.spyOn(deportesService, 'addDeportesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ incripciones });
      comp.ngOnInit();

      expect(deportesService.query).toHaveBeenCalled();
      expect(deportesService.addDeportesToCollectionIfMissing).toHaveBeenCalledWith(
        deportesCollection,
        ...additionalDeportes.map(expect.objectContaining)
      );
      expect(comp.deportesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const incripciones: IIncripciones = { id: 456 };
      const claseOnline: IClasesOnline = { id: 34225 };
      incripciones.claseOnline = claseOnline;
      const deporte: IDeportes = { id: 58555 };
      incripciones.deporte = deporte;

      activatedRoute.data = of({ incripciones });
      comp.ngOnInit();

      expect(comp.clasesOnlinesSharedCollection).toContain(claseOnline);
      expect(comp.deportesSharedCollection).toContain(deporte);
      expect(comp.incripciones).toEqual(incripciones);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIncripciones>>();
      const incripciones = { id: 123 };
      jest.spyOn(incripcionesFormService, 'getIncripciones').mockReturnValue(incripciones);
      jest.spyOn(incripcionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ incripciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: incripciones }));
      saveSubject.complete();

      // THEN
      expect(incripcionesFormService.getIncripciones).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(incripcionesService.update).toHaveBeenCalledWith(expect.objectContaining(incripciones));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIncripciones>>();
      const incripciones = { id: 123 };
      jest.spyOn(incripcionesFormService, 'getIncripciones').mockReturnValue({ id: null });
      jest.spyOn(incripcionesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ incripciones: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: incripciones }));
      saveSubject.complete();

      // THEN
      expect(incripcionesFormService.getIncripciones).toHaveBeenCalled();
      expect(incripcionesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIncripciones>>();
      const incripciones = { id: 123 };
      jest.spyOn(incripcionesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ incripciones });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(incripcionesService.update).toHaveBeenCalled();
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

    describe('compareDeportes', () => {
      it('Should forward to deportesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(deportesService, 'compareDeportes');
        comp.compareDeportes(entity, entity2);
        expect(deportesService.compareDeportes).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
