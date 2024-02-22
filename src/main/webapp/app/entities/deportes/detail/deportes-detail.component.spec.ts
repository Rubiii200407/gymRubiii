import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DeportesDetailComponent } from './deportes-detail.component';

describe('Deportes Management Detail Component', () => {
  let comp: DeportesDetailComponent;
  let fixture: ComponentFixture<DeportesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeportesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ deportes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DeportesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DeportesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load deportes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.deportes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
