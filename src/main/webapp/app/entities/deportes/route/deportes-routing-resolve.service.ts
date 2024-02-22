import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';

@Injectable({ providedIn: 'root' })
export class DeportesRoutingResolveService implements Resolve<IDeportes | null> {
  constructor(protected service: DeportesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeportes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((deportes: HttpResponse<IDeportes>) => {
          if (deportes.body) {
            return of(deportes.body);
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
