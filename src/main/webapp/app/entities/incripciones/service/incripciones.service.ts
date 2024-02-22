import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIncripciones, NewIncripciones } from '../incripciones.model';

export type PartialUpdateIncripciones = Partial<IIncripciones> & Pick<IIncripciones, 'id'>;

type RestOf<T extends IIncripciones | NewIncripciones> = Omit<T, 'fechaInscripcion'> & {
  fechaInscripcion?: string | null;
};

export type RestIncripciones = RestOf<IIncripciones>;

export type NewRestIncripciones = RestOf<NewIncripciones>;

export type PartialUpdateRestIncripciones = RestOf<PartialUpdateIncripciones>;

export type EntityResponseType = HttpResponse<IIncripciones>;
export type EntityArrayResponseType = HttpResponse<IIncripciones[]>;

@Injectable({ providedIn: 'root' })
export class IncripcionesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/incripciones');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(incripciones: NewIncripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(incripciones);
    return this.http
      .post<RestIncripciones>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(incripciones: IIncripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(incripciones);
    return this.http
      .put<RestIncripciones>(`${this.resourceUrl}/${this.getIncripcionesIdentifier(incripciones)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(incripciones: PartialUpdateIncripciones): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(incripciones);
    return this.http
      .patch<RestIncripciones>(`${this.resourceUrl}/${this.getIncripcionesIdentifier(incripciones)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestIncripciones>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestIncripciones[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getIncripcionesIdentifier(incripciones: Pick<IIncripciones, 'id'>): number {
    return incripciones.id;
  }

  compareIncripciones(o1: Pick<IIncripciones, 'id'> | null, o2: Pick<IIncripciones, 'id'> | null): boolean {
    return o1 && o2 ? this.getIncripcionesIdentifier(o1) === this.getIncripcionesIdentifier(o2) : o1 === o2;
  }

  addIncripcionesToCollectionIfMissing<Type extends Pick<IIncripciones, 'id'>>(
    incripcionesCollection: Type[],
    ...incripcionesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const incripciones: Type[] = incripcionesToCheck.filter(isPresent);
    if (incripciones.length > 0) {
      const incripcionesCollectionIdentifiers = incripcionesCollection.map(
        incripcionesItem => this.getIncripcionesIdentifier(incripcionesItem)!
      );
      const incripcionesToAdd = incripciones.filter(incripcionesItem => {
        const incripcionesIdentifier = this.getIncripcionesIdentifier(incripcionesItem);
        if (incripcionesCollectionIdentifiers.includes(incripcionesIdentifier)) {
          return false;
        }
        incripcionesCollectionIdentifiers.push(incripcionesIdentifier);
        return true;
      });
      return [...incripcionesToAdd, ...incripcionesCollection];
    }
    return incripcionesCollection;
  }

  protected convertDateFromClient<T extends IIncripciones | NewIncripciones | PartialUpdateIncripciones>(incripciones: T): RestOf<T> {
    return {
      ...incripciones,
      fechaInscripcion: incripciones.fechaInscripcion?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restIncripciones: RestIncripciones): IIncripciones {
    return {
      ...restIncripciones,
      fechaInscripcion: restIncripciones.fechaInscripcion ? dayjs(restIncripciones.fechaInscripcion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestIncripciones>): HttpResponse<IIncripciones> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestIncripciones[]>): HttpResponse<IIncripciones[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
