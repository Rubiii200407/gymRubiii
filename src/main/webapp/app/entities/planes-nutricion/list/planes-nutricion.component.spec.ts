import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PlanesNutricionService } from '../service/planes-nutricion.service';

import { PlanesNutricionComponent } from './planes-nutricion.component';

describe('PlanesNutricion Management Component', () => {
  let comp: PlanesNutricionComponent;
  let fixture: ComponentFixture<PlanesNutricionComponent>;
  let service: PlanesNutricionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'planes-nutricion', component: PlanesNutricionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [PlanesNutricionComponent],
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
      .overrideTemplate(PlanesNutricionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesNutricionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanesNutricionService);

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
    expect(comp.planesNutricions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to planesNutricionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPlanesNutricionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPlanesNutricionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
