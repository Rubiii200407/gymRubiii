import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVideosClaseOnline, NewVideosClaseOnline } from '../videos-clase-online.model';

export type PartialUpdateVideosClaseOnline = Partial<IVideosClaseOnline> & Pick<IVideosClaseOnline, 'id'>;

export type EntityResponseType = HttpResponse<IVideosClaseOnline>;
export type EntityArrayResponseType = HttpResponse<IVideosClaseOnline[]>;

@Injectable({ providedIn: 'root' })
export class VideosClaseOnlineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/videos-clase-onlines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(videosClaseOnline: NewVideosClaseOnline): Observable<EntityResponseType> {
    return this.http.post<IVideosClaseOnline>(this.resourceUrl, videosClaseOnline, { observe: 'response' });
  }

  update(videosClaseOnline: IVideosClaseOnline): Observable<EntityResponseType> {
    return this.http.put<IVideosClaseOnline>(
      `${this.resourceUrl}/${this.getVideosClaseOnlineIdentifier(videosClaseOnline)}`,
      videosClaseOnline,
      { observe: 'response' }
    );
  }

  partialUpdate(videosClaseOnline: PartialUpdateVideosClaseOnline): Observable<EntityResponseType> {
    return this.http.patch<IVideosClaseOnline>(
      `${this.resourceUrl}/${this.getVideosClaseOnlineIdentifier(videosClaseOnline)}`,
      videosClaseOnline,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVideosClaseOnline>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVideosClaseOnline[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVideosClaseOnlineIdentifier(videosClaseOnline: Pick<IVideosClaseOnline, 'id'>): number {
    return videosClaseOnline.id;
  }

  compareVideosClaseOnline(o1: Pick<IVideosClaseOnline, 'id'> | null, o2: Pick<IVideosClaseOnline, 'id'> | null): boolean {
    return o1 && o2 ? this.getVideosClaseOnlineIdentifier(o1) === this.getVideosClaseOnlineIdentifier(o2) : o1 === o2;
  }

  addVideosClaseOnlineToCollectionIfMissing<Type extends Pick<IVideosClaseOnline, 'id'>>(
    videosClaseOnlineCollection: Type[],
    ...videosClaseOnlinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const videosClaseOnlines: Type[] = videosClaseOnlinesToCheck.filter(isPresent);
    if (videosClaseOnlines.length > 0) {
      const videosClaseOnlineCollectionIdentifiers = videosClaseOnlineCollection.map(
        videosClaseOnlineItem => this.getVideosClaseOnlineIdentifier(videosClaseOnlineItem)!
      );
      const videosClaseOnlinesToAdd = videosClaseOnlines.filter(videosClaseOnlineItem => {
        const videosClaseOnlineIdentifier = this.getVideosClaseOnlineIdentifier(videosClaseOnlineItem);
        if (videosClaseOnlineCollectionIdentifiers.includes(videosClaseOnlineIdentifier)) {
          return false;
        }
        videosClaseOnlineCollectionIdentifiers.push(videosClaseOnlineIdentifier);
        return true;
      });
      return [...videosClaseOnlinesToAdd, ...videosClaseOnlineCollection];
    }
    return videosClaseOnlineCollection;
  }
}
