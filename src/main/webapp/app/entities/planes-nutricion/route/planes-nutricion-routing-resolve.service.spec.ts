import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';

import { PlanesNutricionRoutingResolveService } from './planes-nutricion-routing-resolve.service';

describe('PlanesNutricion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PlanesNutricionRoutingResolveService;
  let service: PlanesNutricionService;
  let resultPlanesNutricion: IPlanesNutricion | null | undefined;

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
    routingResolveService = TestBed.inject(PlanesNutricionRoutingResolveService);
    service = TestBed.inject(PlanesNutricionService);
    resultPlanesNutricion = undefined;
  });

  describe('resolve', () => {
    it('should return IPlanesNutricion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesNutricion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanesNutricion).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesNutricion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPlanesNutricion).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPlanesNutricion>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPlanesNutricion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultPlanesNutricion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
