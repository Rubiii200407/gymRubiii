import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

@Injectable({ providedIn: 'root' })
export class PlanesEntrenamientoRoutingResolveService implements Resolve<IPlanesEntrenamiento | null> {
  constructor(protected service: PlanesEntrenamientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanesEntrenamiento | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((planesEntrenamiento: HttpResponse<IPlanesEntrenamiento>) => {
          if (planesEntrenamiento.body) {
            return of(planesEntrenamiento.body);
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
