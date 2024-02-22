import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IncripcionesService } from '../service/incripciones.service';

import { IncripcionesComponent } from './incripciones.component';

describe('Incripciones Management Component', () => {
  let comp: IncripcionesComponent;
  let fixture: ComponentFixture<IncripcionesComponent>;
  let service: IncripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'incripciones', component: IncripcionesComponent }]), HttpClientTestingModule],
      declarations: [IncripcionesComponent],
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
      .overrideTemplate(IncripcionesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IncripcionesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(IncripcionesService);

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
    expect(comp.incripciones?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to incripcionesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getIncripcionesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getIncripcionesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
