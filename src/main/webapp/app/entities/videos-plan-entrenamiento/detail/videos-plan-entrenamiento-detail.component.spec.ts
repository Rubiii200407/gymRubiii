import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VideosPlanEntrenamientoDetailComponent } from './videos-plan-entrenamiento-detail.component';

describe('VideosPlanEntrenamiento Management Detail Component', () => {
  let comp: VideosPlanEntrenamientoDetailComponent;
  let fixture: ComponentFixture<VideosPlanEntrenamientoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosPlanEntrenamientoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ videosPlanEntrenamiento: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VideosPlanEntrenamientoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VideosPlanEntrenamientoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load videosPlanEntrenamiento on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.videosPlanEntrenamiento).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
