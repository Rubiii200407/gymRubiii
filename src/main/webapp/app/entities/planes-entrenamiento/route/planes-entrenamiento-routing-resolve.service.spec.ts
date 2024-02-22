import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

import { PlanesEntrenamientoRoutingResolveService } from './planes-entrenamiento-routing-resolve.service';

describe('PlanesEntrenamiento routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PlanesEntrenamientoRoutingResolveService;
  let service: PlanesEntrenamientoService;
  let resultPlanesEntrenamiento: IPlanesEntrenamiento | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(PlanesEntrenamientoRoutingResolveService);
    service = TestBed.inject(PlanesEntrenamientoService);
    resultPlanesEntrenamiento = undefined;
  });

  describe('resolve', () => {
    it('should return IPlanesEntrenamiento returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesEntrenamiento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanesEntrenamiento).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesEntrenamiento = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPlanesEntrenamiento).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPlanesEntrenamiento>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesEntrenamiento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanesEntrenamiento).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
