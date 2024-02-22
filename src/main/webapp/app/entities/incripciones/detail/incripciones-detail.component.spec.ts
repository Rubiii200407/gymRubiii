import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IncripcionesDetailComponent } from './incripciones-detail.component';

describe('Incripciones Management Detail Component', () => {
  let comp: IncripcionesDetailComponent;
  let fixture: ComponentFixture<IncripcionesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncripcionesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ incripciones: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(IncripcionesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(IncripcionesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load incripciones on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.incripciones).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
