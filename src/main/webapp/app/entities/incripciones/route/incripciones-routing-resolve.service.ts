import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIncripciones } from '../incripciones.model';
import { IncripcionesService } from '../service/incripciones.service';

@Injectable({ providedIn: 'root' })
export class IncripcionesRoutingResolveService implements Resolve<IIncripciones | null> {
  constructor(protected service: IncripcionesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIncripciones | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((incripciones: HttpResponse<IIncripciones>) => {
          if (incripciones.body) {
            return of(incripciones.body);
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
