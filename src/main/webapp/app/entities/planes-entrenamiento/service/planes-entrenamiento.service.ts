import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPlanesEntrenamiento, NewPlanesEntrenamiento } from '../planes-entrenamiento.model';

type RestOf<T extends IPlanesEntrenamiento | NewPlanesEntrenamiento> = Omit<T, 'fechaEstado' | 'fechaCreacion'> & {

};

export type RestPlanesEntrenamiento = RestOf<IPlanesEntrenamiento>;
export type NewRestPlanesNutricion = RestOf<NewPlanesEntrenamiento>;
export type PartialUpdatePlanesEntrenamiento = Partial<IPlanesEntrenamiento> & Pick<IPlanesEntrenamiento, 'id'>;

export type EntityResponseType = HttpResponse<IPlanesEntrenamiento>;
export type EntityArrayResponseType = HttpResponse<IPlanesEntrenamiento[]>;

@Injectable({ providedIn: 'root' })
export class PlanesEntrenamientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/planes-entrenamientos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planesEntrenamiento: NewPlanesEntrenamiento): Observable<EntityResponseType> {
    return this.http.post<IPlanesEntrenamiento>(this.resourceUrl, planesEntrenamiento, { observe: 'response' });
  }

  update(planesEntrenamiento: IPlanesEntrenamiento): Observable<EntityResponseType> {
    return this.http.put<IPlanesEntrenamiento>(
      `${this.resourceUrl}/${this.getPlanesEntrenamientoIdentifier(planesEntrenamiento)}`,
      planesEntrenamiento,
      { observe: 'response' }
    );
  }

  partialUpdate(planesEntrenamiento: PartialUpdatePlanesEntrenamiento): Observable<EntityResponseType> {
    return this.http.patch<IPlanesEntrenamiento>(
      `${this.resourceUrl}/${this.getPlanesEntrenamientoIdentifier(planesEntrenamiento)}`,
      planesEntrenamiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlanesEntrenamiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findUUID(codigo: string): Observable<EntityResponseType> {
    return this.http
      .get<RestPlanesEntrenamiento>(`${this.resourceUrl + '/UUID'}/${codigo}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  queryWithPagination(params?: any): Observable<HttpResponse<IPlanesEntrenamiento[]>> {
    const options = createRequestOption(params);
    return this.http.get<IPlanesEntrenamiento[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlanesEntrenamiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlanesEntrenamientoIdentifier(planesEntrenamiento: Pick<IPlanesEntrenamiento, 'id'>): number {
    return planesEntrenamiento.id;
  }

  comparePlanesEntrenamiento(o1: Pick<IPlanesEntrenamiento, 'id'> | null, o2: Pick<IPlanesEntrenamiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanesEntrenamientoIdentifier(o1) === this.getPlanesEntrenamientoIdentifier(o2) : o1 === o2;
  }
  protected convertDateFromServer(restPlanesEntrenamiento: RestPlanesEntrenamiento): IPlanesEntrenamiento {
    return {
      ...restPlanesEntrenamiento,
     
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPlanesEntrenamiento>): HttpResponse<IPlanesEntrenamiento> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }


  addPlanesEntrenamientoToCollectionIfMissing<Type extends Pick<IPlanesEntrenamiento, 'id'>>(
    planesEntrenamientoCollection: Type[],
    ...planesEntrenamientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const planesEntrenamientos: Type[] = planesEntrenamientosToCheck.filter(isPresent);
    if (planesEntrenamientos.length > 0) {
      const planesEntrenamientoCollectionIdentifiers = planesEntrenamientoCollection.map(
        planesEntrenamientoItem => this.getPlanesEntrenamientoIdentifier(planesEntrenamientoItem)!
      );
      const planesEntrenamientosToAdd = planesEntrenamientos.filter(planesEntrenamientoItem => {
        const planesEntrenamientoIdentifier = this.getPlanesEntrenamientoIdentifier(planesEntrenamientoItem);
        if (planesEntrenamientoCollectionIdentifiers.includes(planesEntrenamientoIdentifier)) {
          return false;
        }
        planesEntrenamientoCollectionIdentifiers.push(planesEntrenamientoIdentifier);
        return true;
      });
      return [...planesEntrenamientosToAdd, ...planesEntrenamientoCollection];
    }
    return planesEntrenamientoCollection;
  }
}
