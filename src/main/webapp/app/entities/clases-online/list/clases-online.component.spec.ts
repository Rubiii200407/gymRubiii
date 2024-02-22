import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ClasesOnlineService } from '../service/clases-online.service';

import { ClasesOnlineComponent } from './clases-online.component';

describe('ClasesOnline Management Component', () => {
  let comp: ClasesOnlineComponent;
  let fixture: ComponentFixture<ClasesOnlineComponent>;
  let service: ClasesOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'clases-online', component: ClasesOnlineComponent }]), HttpClientTestingModule],
      declarations: [ClasesOnlineComponent],
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
      .overrideTemplate(ClasesOnlineComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClasesOnlineComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ClasesOnlineService);

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
    expect(comp.clasesOnlines?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to clasesOnlineService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getClasesOnlineIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getClasesOnlineIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
