import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VideosClaseOnlineService } from '../service/videos-clase-online.service';

import { VideosClaseOnlineComponent } from './videos-clase-online.component';

describe('VideosClaseOnline Management Component', () => {
  let comp: VideosClaseOnlineComponent;
  let fixture: ComponentFixture<VideosClaseOnlineComponent>;
  let service: VideosClaseOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'videos-clase-online', component: VideosClaseOnlineComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [VideosClaseOnlineComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(VideosClaseOnlineComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VideosClaseOnlineComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VideosClaseOnlineService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.videosClaseOnlines?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to videosClaseOnlineService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVideosClaseOnlineIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVideosClaseOnlineIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
