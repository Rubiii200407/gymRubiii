import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPlanesNutricion, NewPlanesNutricion } from '../planes-nutricion.model';

export type PartialUpdatePlanesNutricion = Partial<IPlanesNutricion> & Pick<IPlanesNutricion, 'id'>;

export type EntityResponseType = HttpResponse<IPlanesNutricion>;
export type EntityArrayResponseType = HttpResponse<IPlanesNutricion[]>;

@Injectable({ providedIn: 'root' })
export class PlanesNutricionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planes-nutricions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planesNutricion: NewPlanesNutricion): Observable<EntityResponseType> {
    return this.http.post<IPlanesNutricion>(this.resourceUrl, planesNutricion, { observe: 'response' });
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
