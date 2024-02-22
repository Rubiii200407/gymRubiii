import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVideosClaseOnline } from '../videos-clase-online.model';
import { VideosClaseOnlineService } from '../service/videos-clase-online.service';

@Injectable({ providedIn: 'root' })
export class VideosClaseOnlineRoutingResolveService implements Resolve<IVideosClaseOnline | null> {
  constructor(protected service: VideosClaseOnlineService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVideosClaseOnline | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((videosClaseOnline: HttpResponse<IVideosClaseOnline>) => {
          if (videosClaseOnline.body) {
            return of(videosClaseOnline.body);
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
