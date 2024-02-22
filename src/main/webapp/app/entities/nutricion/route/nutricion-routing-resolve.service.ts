import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INutricion } from '../nutricion.model';
import { NutricionService } from '../service/nutricion.service';

@Injectable({ providedIn: 'root' })
export class NutricionRoutingResolveService implements Resolve<INutricion | null> {
  constructor(protected service: NutricionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INutricion | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nutricion: HttpResponse<INutricion>) => {
          if (nutricion.body) {
            return of(nutricion.body);
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
