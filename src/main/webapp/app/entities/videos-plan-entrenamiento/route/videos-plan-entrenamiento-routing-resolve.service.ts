import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';
import { VideosPlanEntrenamientoService } from '../service/videos-plan-entrenamiento.service';

@Injectable({ providedIn: 'root' })
export class VideosPlanEntrenamientoRoutingResolveService implements Resolve<IVideosPlanEntrenamiento | null> {
  constructor(protected service: VideosPlanEntrenamientoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVideosPlanEntrenamiento | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((videosPlanEntrenamiento: HttpResponse<IVideosPlanEntrenamiento>) => {
          if (videosPlanEntrenamiento.body) {
            return of(videosPlanEntrenamiento.body);
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
