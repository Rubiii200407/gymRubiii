import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NutricionDetailComponent } from './nutricion-detail.component';

describe('Nutricion Management Detail Component', () => {
  let comp: NutricionDetailComponent;
  let fixture: ComponentFixture<NutricionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutricionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ nutricion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(NutricionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NutricionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load nutricion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.nutricion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
