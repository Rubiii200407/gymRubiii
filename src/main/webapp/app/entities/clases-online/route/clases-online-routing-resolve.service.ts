import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClasesOnline } from '../clases-online.model';
import { ClasesOnlineService } from '../service/clases-online.service';

@Injectable({ providedIn: 'root' })
export class ClasesOnlineRoutingResolveService implements Resolve<IClasesOnline | null> {
  constructor(protected service: ClasesOnlineService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClasesOnline | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((clasesOnline: HttpResponse<IClasesOnline>) => {
          if (clasesOnline.body) {
            return of(clasesOnline.body);
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
