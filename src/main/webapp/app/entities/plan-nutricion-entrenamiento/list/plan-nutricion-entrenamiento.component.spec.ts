import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNutricionEntrenamientoComponent } from './plan-nutricion-entrenamiento.component';

describe('PlanNutricionEntrenamientoComponent', () => {
  let component: PlanNutricionEntrenamientoComponent;
  let fixture: ComponentFixture<PlanNutricionEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanNutricionEntrenamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanNutricionEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
