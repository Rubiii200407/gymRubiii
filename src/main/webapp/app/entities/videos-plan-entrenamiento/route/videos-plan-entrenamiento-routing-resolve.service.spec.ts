import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';
import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';

import { VideosPlanEntrenamientoRoutingResolveService } from './videos-plan-entrenamiento-routing-resolve.service';

describe('VideosPlanEntrenamiento routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VideosPlanEntrenamientoRoutingResolveService;
  let service: VideosPlanEntrenamientoService;
  let resultVideosPlanEntrenamiento: IVideosPlanEntrenamiento | null | undefined;

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
    routingResolveService = TestBed.inject(VideosPlanEntrenamientoRoutingResolveService);
    service = TestBed.inject(VideosPlanEntrenamientoService);
    resultVideosPlanEntrenamiento = undefined;
  });

  describe('resolve', () => {
    it('should return IVideosPlanEntrenamiento returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosPlanEntrenamiento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVideosPlanEntrenamiento).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosPlanEntrenamiento = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVideosPlanEntrenamiento).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IVideosPlanEntrenamiento>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosPlanEntrenamiento = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVideosPlanEntrenamiento).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
