import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INutricion, NewNutricion } from '../nutricion.model';

export type PartialUpdateNutricion = Partial<INutricion> & Pick<INutricion, 'id'>;

export type EntityResponseType = HttpResponse<INutricion>;
export type EntityArrayResponseType = HttpResponse<INutricion[]>;

@Injectable({ providedIn: 'root' })
export class NutricionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nutricions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nutricion: NewNutricion): Observable<EntityResponseType> {
    return this.http.post<INutricion>(this.resourceUrl, nutricion, { observe: 'response' });
  }

  update(nutricion: INutricion): Observable<EntityResponseType> {
    return this.http.put<INutricion>(`${this.resourceUrl}/${this.getNutricionIdentifier(nutricion)}`, nutricion, { observe: 'response' });
  }

  partialUpdate(nutricion: PartialUpdateNutricion): Observable<EntityResponseType> {
    return this.http.patch<INutricion>(`${this.resourceUrl}/${this.getNutricionIdentifier(nutricion)}`, nutricion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INutricion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INutricion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNutricionIdentifier(nutricion: Pick<INutricion, 'id'>): number {
    return nutricion.id;
  }

  compareNutricion(o1: Pick<INutricion, 'id'> | null, o2: Pick<INutricion, 'id'> | null): boolean {
    return o1 && o2 ? this.getNutricionIdentifier(o1) === this.getNutricionIdentifier(o2) : o1 === o2;
  }

  addNutricionToCollectionIfMissing<Type extends Pick<INutricion, 'id'>>(
    nutricionCollection: Type[],
    ...nutricionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nutricions: Type[] = nutricionsToCheck.filter(isPresent);
    if (nutricions.length > 0) {
      const nutricionCollectionIdentifiers = nutricionCollection.map(nutricionItem => this.getNutricionIdentifier(nutricionItem)!);
      const nutricionsToAdd = nutricions.filter(nutricionItem => {
        const nutricionIdentifier = this.getNutricionIdentifier(nutricionItem);
        if (nutricionCollectionIdentifiers.includes(nutricionIdentifier)) {
          return false;
        }
        nutricionCollectionIdentifiers.push(nutricionIdentifier);
        return true;
      });
      return [...nutricionsToAdd, ...nutricionCollection];
    }
    return nutricionCollection;
  }
}
