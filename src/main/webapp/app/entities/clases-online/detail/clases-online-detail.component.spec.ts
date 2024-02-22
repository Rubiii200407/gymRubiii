import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClasesOnlineDetailComponent } from './clases-online-detail.component';

describe('ClasesOnline Management Detail Component', () => {
  let comp: ClasesOnlineDetailComponent;
  let fixture: ComponentFixture<ClasesOnlineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasesOnlineDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ clasesOnline: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ClasesOnlineDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ClasesOnlineDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load clasesOnline on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.clasesOnline).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
