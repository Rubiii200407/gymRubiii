import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';

import { VideosPlanEntrenamientoComponent } from './videos-plan-entrenamiento.component';

describe('VideosPlanEntrenamiento Management Component', () => {
  let comp: VideosPlanEntrenamientoComponent;
  let fixture: ComponentFixture<VideosPlanEntrenamientoComponent>;
  let service: VideosPlanEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'videos-plan-entrenamiento', component: VideosPlanEntrenamientoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [VideosPlanEntrenamientoComponent],
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
      .overrideTemplate(VideosPlanEntrenamientoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VideosPlanEntrenamientoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VideosPlanEntrenamientoService);

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
    expect(comp.videosPlanEntrenamientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to videosPlanEntrenamientoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVideosPlanEntrenamientoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVideosPlanEntrenamientoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
