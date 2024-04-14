import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IClasesOnline, NewClasesOnline } from '../clases-online.model';

export type PartialUpdateClasesOnline = Partial<IClasesOnline> & Pick<IClasesOnline, 'id'>;
type RestOf<T extends IClasesOnline | NewClasesOnline> = Omit<T, '' | ''> & {

};
export type EntityResponseType = HttpResponse<IClasesOnline>;
export type EntityArrayResponseType = HttpResponse<IClasesOnline[]>;
export type RestClasesOnline = RestOf<IClasesOnline>;

export type NewRestClasesOnline = RestOf<NewClasesOnline>;

export type PartialUpdateRestClasesOnline = RestOf<PartialUpdateClasesOnline>;

@Injectable({ providedIn: 'root' })
export class ClasesOnlineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/clases-online');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(clasesOnline: NewClasesOnline): Observable<EntityResponseType> {
    return this.http.post<IClasesOnline>(this.resourceUrl, clasesOnline, { observe: 'response' });
  }

  update(clasesOnline: IClasesOnline): Observable<EntityResponseType> {
    return this.http.put<IClasesOnline>(`${this.resourceUrl}/${this.getClasesOnlineIdentifier(clasesOnline)}`, clasesOnline, {
      observe: 'response',
    });
  }
  findUUID(codigo: string): Observable<EntityResponseType> {
    return this.http
      .get<RestClasesOnline>(`${this.resourceUrl + '/UUID'}/${codigo}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  queryWithPagination(params?: any): Observable<HttpResponse<IClasesOnline[]>> {
    const options = createRequestOption(params);
    return this.http.get<IClasesOnline[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }
  partialUpdate(clasesOnline: PartialUpdateClasesOnline): Observable<EntityResponseType> {
    return this.http.patch<IClasesOnline>(`${this.resourceUrl}/${this.getClasesOnlineIdentifier(clasesOnline)}`, clasesOnline, {
      observe: 'response',
    });
  }


  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestClasesOnline>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClasesOnline[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getClasesOnlineIdentifier(clasesOnline: Pick<IClasesOnline, 'id'>): number {
    return clasesOnline.id;
  }
  protected convertDateFromClient<T extends IClasesOnline | NewClasesOnline | PartialUpdateClasesOnline>(
    clasesOnline: T
  ): RestOf<T> {
    return {
      ...clasesOnline,
   
    };
  }

  protected convertDateFromServer(restClasesOnline: RestClasesOnline): IClasesOnline {
    return {
      ...restClasesOnline,
     
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestClasesOnline>): HttpResponse<IClasesOnline> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }


  compareClasesOnline(o1: Pick<IClasesOnline, 'id'> | null, o2: Pick<IClasesOnline, 'id'> | null): boolean {
    return o1 && o2 ? this.getClasesOnlineIdentifier(o1) === this.getClasesOnlineIdentifier(o2) : o1 === o2;
  }

  addClasesOnlineToCollectionIfMissing<Type extends Pick<IClasesOnline, 'id'>>(
    clasesOnlineCollection: Type[],
    ...clasesOnlinesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const clasesOnlines: Type[] = clasesOnlinesToCheck.filter(isPresent);
    if (clasesOnlines.length > 0) {
      const clasesOnlineCollectionIdentifiers = clasesOnlineCollection.map(
        clasesOnlineItem => this.getClasesOnlineIdentifier(clasesOnlineItem)!
      );
      const clasesOnlinesToAdd = clasesOnlines.filter(clasesOnlineItem => {
        const clasesOnlineIdentifier = this.getClasesOnlineIdentifier(clasesOnlineItem);
        if (clasesOnlineCollectionIdentifiers.includes(clasesOnlineIdentifier)) {
          return false;
        }
        clasesOnlineCollectionIdentifiers.push(clasesOnlineIdentifier);
        return true;
      });
      return [...clasesOnlinesToAdd, ...clasesOnlineCollection];
    }
    return clasesOnlineCollection;
  }
}
