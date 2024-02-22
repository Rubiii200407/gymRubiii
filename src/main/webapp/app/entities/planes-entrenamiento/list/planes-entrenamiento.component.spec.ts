import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

import { PlanesEntrenamientoComponent } from './planes-entrenamiento.component';

describe('PlanesEntrenamiento Management Component', () => {
  let comp: PlanesEntrenamientoComponent;
  let fixture: ComponentFixture<PlanesEntrenamientoComponent>;
  let service: PlanesEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'planes-entrenamiento', component: PlanesEntrenamientoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [PlanesEntrenamientoComponent],
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
      .overrideTemplate(PlanesEntrenamientoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanesEntrenamientoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanesEntrenamientoService);

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
    expect(comp.planesEntrenamientos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to planesEntrenamientoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPlanesEntrenamientoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPlanesEntrenamientoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
