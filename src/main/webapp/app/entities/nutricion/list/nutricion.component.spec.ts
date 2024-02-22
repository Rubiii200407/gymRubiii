import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { NutricionService } from '../service/nutricion.service';

import { NutricionComponent } from './nutricion.component';

describe('Nutricion Management Component', () => {
  let comp: NutricionComponent;
  let fixture: ComponentFixture<NutricionComponent>;
  let service: NutricionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'nutricion', component: NutricionComponent }]), HttpClientTestingModule],
      declarations: [NutricionComponent],
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
      .overrideTemplate(NutricionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NutricionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NutricionService);

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
    expect(comp.nutricions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to nutricionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getNutricionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getNutricionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
