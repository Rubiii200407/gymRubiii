import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVideosPlanEntrenamiento, NewVideosPlanEntrenamiento } from '../videos-plan-entrenamiento.model';

export type PartialUpdateVideosPlanEntrenamiento = Partial<IVideosPlanEntrenamiento> & Pick<IVideosPlanEntrenamiento, 'id'>;

type RestOf<T extends IVideosPlanEntrenamiento | NewVideosPlanEntrenamiento> = Omit<T, 'fechaPublicacion'> & {
  fechaPublicacion?: string | null;
};

export type RestVideosPlanEntrenamiento = RestOf<IVideosPlanEntrenamiento>;

export type NewRestVideosPlanEntrenamiento = RestOf<NewVideosPlanEntrenamiento>;

export type PartialUpdateRestVideosPlanEntrenamiento = RestOf<PartialUpdateVideosPlanEntrenamiento>;

export type EntityResponseType = HttpResponse<IVideosPlanEntrenamiento>;
export type EntityArrayResponseType = HttpResponse<IVideosPlanEntrenamiento[]>;

@Injectable({ providedIn: 'root' })
export class VideosPlanEntrenamientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/videos-plan-entrenamientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(videosPlanEntrenamiento: NewVideosPlanEntrenamiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(videosPlanEntrenamiento);
    return this.http
      .post<RestVideosPlanEntrenamiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(videosPlanEntrenamiento: IVideosPlanEntrenamiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(videosPlanEntrenamiento);
    return this.http
      .put<RestVideosPlanEntrenamiento>(`${this.resourceUrl}/${this.getVideosPlanEntrenamientoIdentifier(videosPlanEntrenamiento)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(videosPlanEntrenamiento: PartialUpdateVideosPlanEntrenamiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(videosPlanEntrenamiento);
    return this.http
      .patch<RestVideosPlanEntrenamiento>(
        `${this.resourceUrl}/${this.getVideosPlanEntrenamientoIdentifier(videosPlanEntrenamiento)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestVideosPlanEntrenamiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestVideosPlanEntrenamiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVideosPlanEntrenamientoIdentifier(videosPlanEntrenamiento: Pick<IVideosPlanEntrenamiento, 'id'>): number {
    return videosPlanEntrenamiento.id;
  }

  compareVideosPlanEntrenamiento(
    o1: Pick<IVideosPlanEntrenamiento, 'id'> | null,
    o2: Pick<IVideosPlanEntrenamiento, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getVideosPlanEntrenamientoIdentifier(o1) === this.getVideosPlanEntrenamientoIdentifier(o2) : o1 === o2;
  }

  addVideosPlanEntrenamientoToCollectionIfMissing<Type extends Pick<IVideosPlanEntrenamiento, 'id'>>(
    videosPlanEntrenamientoCollection: Type[],
    ...videosPlanEntrenamientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const videosPlanEntrenamientos: Type[] = videosPlanEntrenamientosToCheck.filter(isPresent);
    if (videosPlanEntrenamientos.length > 0) {
      const videosPlanEntrenamientoCollectionIdentifiers = videosPlanEntrenamientoCollection.map(
        videosPlanEntrenamientoItem => this.getVideosPlanEntrenamientoIdentifier(videosPlanEntrenamientoItem)!
      );
      const videosPlanEntrenamientosToAdd = videosPlanEntrenamientos.filter(videosPlanEntrenamientoItem => {
        const videosPlanEntrenamientoIdentifier = this.getVideosPlanEntrenamientoIdentifier(videosPlanEntrenamientoItem);
        if (videosPlanEntrenamientoCollectionIdentifiers.includes(videosPlanEntrenamientoIdentifier)) {
          return false;
        }
        videosPlanEntrenamientoCollectionIdentifiers.push(videosPlanEntrenamientoIdentifier);
        return true;
      });
      return [...videosPlanEntrenamientosToAdd, ...videosPlanEntrenamientoCollection];
    }
    return videosPlanEntrenamientoCollection;
  }

  protected convertDateFromClient<T extends IVideosPlanEntrenamiento | NewVideosPlanEntrenamiento | PartialUpdateVideosPlanEntrenamiento>(
    videosPlanEntrenamiento: T
  ): RestOf<T> {
    return {
      ...videosPlanEntrenamiento,
      fechaPublicacion: videosPlanEntrenamiento.fechaPublicacion?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restVideosPlanEntrenamiento: RestVideosPlanEntrenamiento): IVideosPlanEntrenamiento {
    return {
      ...restVideosPlanEntrenamiento,
      fechaPublicacion: restVideosPlanEntrenamiento.fechaPublicacion ? dayjs(restVideosPlanEntrenamiento.fechaPublicacion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestVideosPlanEntrenamiento>): HttpResponse<IVideosPlanEntrenamiento> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestVideosPlanEntrenamiento[]>): HttpResponse<IVideosPlanEntrenamiento[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
