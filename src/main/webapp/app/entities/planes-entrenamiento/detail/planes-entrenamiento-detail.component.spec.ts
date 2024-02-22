import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlanesEntrenamientoDetailComponent } from './planes-entrenamiento-detail.component';

describe('PlanesEntrenamiento Management Detail Component', () => {
  let comp: PlanesEntrenamientoDetailComponent;
  let fixture: ComponentFixture<PlanesEntrenamientoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesEntrenamientoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ planesEntrenamiento: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PlanesEntrenamientoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PlanesEntrenamientoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load planesEntrenamiento on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.planesEntrenamiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
