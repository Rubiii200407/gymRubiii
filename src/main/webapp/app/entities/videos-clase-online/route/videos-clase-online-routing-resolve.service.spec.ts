import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVideosClaseOnline } from '../videos-clase-online.model';
import { VideosClaseOnlineService } from '../service/videos-clase-online.service';

import { VideosClaseOnlineRoutingResolveService } from './videos-clase-online-routing-resolve.service';

describe('VideosClaseOnline routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VideosClaseOnlineRoutingResolveService;
  let service: VideosClaseOnlineService;
  let resultVideosClaseOnline: IVideosClaseOnline | null | undefined;

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
    routingResolveService = TestBed.inject(VideosClaseOnlineRoutingResolveService);
    service = TestBed.inject(VideosClaseOnlineService);
    resultVideosClaseOnline = undefined;
  });

  describe('resolve', () => {
    it('should return IVideosClaseOnline returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosClaseOnline = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVideosClaseOnline).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosClaseOnline = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVideosClaseOnline).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IVideosClaseOnline>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVideosClaseOnline = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVideosClaseOnline).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
