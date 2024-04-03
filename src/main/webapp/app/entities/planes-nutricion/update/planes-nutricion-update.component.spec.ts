import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, from, of } from 'rxjs';

import { INutricion } from 'app/entities/nutricion/nutricion.model';
import { NutricionService } from 'app/entities/nutricion/service/nutricion.service';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';
import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';
import { PlanesNutricionFormService } from './planes-nutricion-form.service';

import { PlanesNutricionUpdateComponent } from './planes-nutricion-update.component';

describe('PlanesNutricion Management Update Component', () => {
  let comp: PlanesNutricionUpdateComponent;
  let fixture: ComponentFixture<PlanesNutricionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planesNutricionFormService: PlanesNutricionFormService;
  let planesNutricionService: PlanesNutricionService;
  let nutricionService: NutricionService;
  let planesEntrenamientoService: PlanesEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlanesNutricionUpdateComponent],
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
      .overrideTemplate(PlanesNutricionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesNutricionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planesNutricionFormService = TestBed.inject(PlanesNutricionFormService);
    planesNutricionService = TestBed.inject(PlanesNutricionService);
    nutricionService = TestBed.inject(NutricionService);
    planesEntrenamientoService = TestBed.inject(PlanesEntrenamientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Nutricion query and add missing value', () => {
      const planesNutricion: IPlanesNutricion = { id: 456 };
      const planNutricion: INutricion = { id: 80810 };
      planesNutricion.planNutricion = planNutricion;

      const nutricionCollection: INutricion[] = [{ id: 22578 }];
      jest.spyOn(nutricionService, 'query').mockReturnValue(of(new HttpResponse({ body: nutricionCollection })));
      const additionalNutricions = [planNutricion];
      const expectedCollection: INutricion[] = [...additionalNutricions, ...nutricionCollection];
      jest.spyOn(nutricionService, 'addNutricionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planesNutricion });
      comp.ngOnInit();

      expect(nutricionService.query).toHaveBeenCalled();
      expect(nutricionService.addNutricionToCollectionIfMissing).toHaveBeenCalledWith(
        nutricionCollection,
        ...additionalNutricions.map(expect.objectContaining)
      );
      expect(comp.nutricionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PlanesEntrenamiento query and add missing value', () => {
      const planesNutricion: IPlanesNutricion = { id: 456 };
      const planEntrenamiento: IPlanesEntrenamiento = { id: 82997 };
      planesNutricion.planEntrenamiento = planEntrenamiento;

      const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [{ id: 80061 }];
      jest.spyOn(planesEntrenamientoService, 'query').mockReturnValue(of(new HttpResponse({ body: planesEntrenamientoCollection })));
      const additionalPlanesEntrenamientos = [planEntrenamiento];
      const expectedCollection: IPlanesEntrenamiento[] = [...additionalPlanesEntrenamientos, ...planesEntrenamientoCollection];
      jest.spyOn(planesEntrenamientoService, 'addPlanesEntrenamientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ planesNutricion });
      comp.ngOnInit();

      expect(planesEntrenamientoService.query).toHaveBeenCalled();
      expect(planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing).toHaveBeenCalledWith(
        planesEntrenamientoCollection,
        ...additionalPlanesEntrenamientos.map(expect.objectContaining)
      );
      expect(comp.planesEntrenamientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const planesNutricion: IPlanesNutricion = { id: 456 };
      const planNutricion: INutricion = { id: 81776 };
      planesNutricion.planNutricion = planNutricion;
      const planEntrenamiento: IPlanesEntrenamiento = { id: 80765 };
      planesNutricion.planEntrenamiento = planEntrenamiento;

      activatedRoute.data = of({ planesNutricion });
      comp.ngOnInit();

      expect(comp.nutricionsSharedCollection).toContain(planNutricion);
      expect(comp.planesEntrenamientosSharedCollection).toContain(planEntrenamiento);
      expect(comp.planesNutricion).toEqual(planesNutricion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesNutricion>>();
      const planesNutricion = { id: 123 };
      jest.spyOn(planesNutricionFormService, 'getPlanesNutricion').mockReturnValue(planesNutricion);
      jest.spyOn(planesNutricionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesNutricion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesNutricion }));
      saveSubject.complete();

      // THEN
      expect(planesNutricionFormService.getPlanesNutricion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(planesNutricionService.update).toHaveBeenCalledWith(expect.objectContaining(planesNutricion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesNutricion>>();
      const planesNutricion = { id: 123 };
      jest.spyOn(planesNutricionFormService, 'getPlanesNutricion').mockReturnValue({ id: null });
      jest.spyOn(planesNutricionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesNutricion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: planesNutricion }));
      saveSubject.complete();

      // THEN
      expect(planesNutricionFormService.getPlanesNutricion).toHaveBeenCalled();
      expect(planesNutricionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlanesNutricion>>();
      const planesNutricion = { id: 123 };
      jest.spyOn(planesNutricionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ planesNutricion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planesNutricionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNutricion', () => {
      it('Should forward to nutricionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(nutricionService, 'compareNutricion');
        comp.compareNutricion(entity, entity2);
        expect(nutricionService.compareNutricion).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
