import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanesNutricionDetailComponent } from './planes-nutricion-detail.component';

describe('PlanesNutricion Management Detail Component', () => {
  let comp: PlanesNutricionDetailComponent;
  let fixture: ComponentFixture<PlanesNutricionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesNutricionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ planesNutricion: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlanesNutricionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlanesNutricionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load planesNutricion on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.planesNutricion).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
