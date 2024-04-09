import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';
import { PlanNutricionEntrenamientoService } from '../service/plan-nutricion-entrenamiento.service';
;

@Injectable({ providedIn: 'root' })
export class PlanNutricionEntrenamientoRoutingResolveService implements Resolve<IPlanNutricionEntrenamiento | null> {
  constructor(protected service: PlanNutricionEntrenamientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanNutricionEntrenamiento | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((planNutricionEntrenamiento: HttpResponse<IPlanNutricionEntrenamiento>) => {
          if (planNutricionEntrenamiento.body) {
            return of(planNutricionEntrenamiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
