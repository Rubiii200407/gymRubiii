import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDeportes, NewDeportes } from '../deportes.model';

export type PartialUpdateDeportes = Partial<IDeportes> & Pick<IDeportes, 'id'>;

export type EntityResponseType = HttpResponse<IDeportes>;
export type EntityArrayResponseType = HttpResponse<IDeportes[]>;

@Injectable({ providedIn: 'root' })
export class DeportesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/deportes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(deportes: NewDeportes): Observable<EntityResponseType> {
    return this.http.post<IDeportes>(this.resourceUrl, deportes, { observe: 'response' });
  }

  update(deportes: IDeportes): Observable<EntityResponseType> {
    return this.http.put<IDeportes>(`${this.resourceUrl}/${this.getDeportesIdentifier(deportes)}`, deportes, { observe: 'response' });
  }

  partialUpdate(deportes: PartialUpdateDeportes): Observable<EntityResponseType> {
    return this.http.patch<IDeportes>(`${this.resourceUrl}/${this.getDeportesIdentifier(deportes)}`, deportes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDeportes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDeportes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDeportesIdentifier(deportes: Pick<IDeportes, 'id'>): number {
    return deportes.id;
  }

  compareDeportes(o1: Pick<IDeportes, 'id'> | null, o2: Pick<IDeportes, 'id'> | null): boolean {
    return o1 && o2 ? this.getDeportesIdentifier(o1) === this.getDeportesIdentifier(o2) : o1 === o2;
  }

  addDeportesToCollectionIfMissing<Type extends Pick<IDeportes, 'id'>>(
    deportesCollection: Type[],
    ...deportesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const deportes: Type[] = deportesToCheck.filter(isPresent);
    if (deportes.length > 0) {
      const deportesCollectionIdentifiers = deportesCollection.map(deportesItem => this.getDeportesIdentifier(deportesItem)!);
      const deportesToAdd = deportes.filter(deportesItem => {
        const deportesIdentifier = this.getDeportesIdentifier(deportesItem);
        if (deportesCollectionIdentifiers.includes(deportesIdentifier)) {
          return false;
        }
        deportesCollectionIdentifiers.push(deportesIdentifier);
        return true;
      });
      return [...deportesToAdd, ...deportesCollection];
    }
    return deportesCollection;
  }
}
