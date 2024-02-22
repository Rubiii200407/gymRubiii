import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';

@Injectable({ providedIn: 'root' })
export class PlanesNutricionRoutingResolveService implements Resolve<IPlanesNutricion | null> {
  constructor(protected service: PlanesNutricionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanesNutricion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((planesNutricion: HttpResponse<IPlanesNutricion>) => {
          if (planesNutricion.body) {
            return of(planesNutricion.body);
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
