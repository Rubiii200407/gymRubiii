import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VideosClaseOnlineDetailComponent } from './videos-clase-online-detail.component';

describe('VideosClaseOnline Management Detail Component', () => {
  let comp: VideosClaseOnlineDetailComponent;
  let fixture: ComponentFixture<VideosClaseOnlineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosClaseOnlineDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ videosClaseOnline: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VideosClaseOnlineDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VideosClaseOnlineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load videosClaseOnline on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.videosClaseOnline).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
