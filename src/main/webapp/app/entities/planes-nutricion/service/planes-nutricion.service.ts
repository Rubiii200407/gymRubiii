import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPlanesNutricion, NewPlanesNutricion } from '../planes-nutricion.model';

export type PartialUpdatePlanesNutricion = Partial<IPlanesNutricion> & Pick<IPlanesNutricion, 'id'>;
type RestOf<T extends IPlanesNutricion | NewPlanesNutricion> = Omit<T, 'fechaEstado' | 'fechaCreacion'> & {

};
export type EntityResponseType = HttpResponse<IPlanesNutricion>;
export type EntityArrayResponseType = HttpResponse<IPlanesNutricion[]>;
export type RestPlanesNutricion = RestOf<IPlanesNutricion>;
export type NewRestPlanesNutricion = RestOf<NewPlanesNutricion>;


@Injectable({ providedIn: 'root' })
export class PlanesNutricionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planes-nutricion');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planesNutricion: NewPlanesNutricion): Observable<EntityResponseType> {
    return this.http.post<IPlanesNutricion>(this.resourceUrl, planesNutricion, { observe: 'response' });
  }
  findUUID(codigo: string): Observable<EntityResponseType> {
    return this.http
      .get<RestPlanesNutricion>(`${this.resourceUrl + '/UUID'}/${codigo}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(planesNutricion: IPlanesNutricion): Observable<EntityResponseType> {
    return this.http.put<IPlanesNutricion>(`${this.resourceUrl}/${this.getPlanesNutricionIdentifier(planesNutricion)}`, planesNutricion, {
      observe: 'response',
    });
  }

  partialUpdate(planesNutricion: PartialUpdatePlanesNutricion): Observable<EntityResponseType> {
    return this.http.patch<IPlanesNutricion>(`${this.resourceUrl}/${this.getPlanesNutricionIdentifier(planesNutricion)}`, planesNutricion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlanesNutricion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  queryWithPagination(params?: any): Observable<HttpResponse<IPlanesNutricion[]>> {
    const options = createRequestOption(params);
    return this.http.get<IPlanesNutricion[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlanesNutricion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlanesNutricionIdentifier(planesNutricion: Pick<IPlanesNutricion, 'id'>): number {
    return planesNutricion.id;
  }

  comparePlanesNutricion(o1: Pick<IPlanesNutricion, 'id'> | null, o2: Pick<IPlanesNutricion, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanesNutricionIdentifier(o1) === this.getPlanesNutricionIdentifier(o2) : o1 === o2;
  }
  protected convertDateFromServer(restPlanesNutricion: RestPlanesNutricion): IPlanesNutricion {
    return {
      ...restPlanesNutricion,
     
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPlanesNutricion>): HttpResponse<IPlanesNutricion> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  addPlanesNutricionToCollectionIfMissing<Type extends Pick<IPlanesNutricion, 'id'>>(
    planesNutricionCollection: Type[],
    ...planesNutricionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const planesNutricions: Type[] = planesNutricionsToCheck.filter(isPresent);
    if (planesNutricions.length > 0) {
      const planesNutricionCollectionIdentifiers = planesNutricionCollection.map(
        planesNutricionItem => this.getPlanesNutricionIdentifier(planesNutricionItem)!
      );
      const planesNutricionsToAdd = planesNutricions.filter(planesNutricionItem => {
        const planesNutricionIdentifier = this.getPlanesNutricionIdentifier(planesNutricionItem);
        if (planesNutricionCollectionIdentifiers.includes(planesNutricionIdentifier)) {
          return false;
        }
        planesNutricionCollectionIdentifiers.push(planesNutricionIdentifier);
        return true;
      });
      return [...planesNutricionsToAdd, ...planesNutricionCollection];
    }
    return planesNutricionCollection;
  }
}
