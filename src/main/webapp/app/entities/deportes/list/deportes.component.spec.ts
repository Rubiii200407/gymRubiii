import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DeportesService } from '../service/deportes.service';

import { DeportesComponent } from './deportes.component';

describe('Deportes Management Component', () => {
  let comp: DeportesComponent;
  let fixture: ComponentFixture<DeportesComponent>;
  let service: DeportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'deportes', component: DeportesComponent }]), HttpClientTestingModule],
      declarations: [DeportesComponent],
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
      .overrideTemplate(DeportesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DeportesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DeportesService);

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
    expect(comp.deportes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to deportesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDeportesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDeportesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
