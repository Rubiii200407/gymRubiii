import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClasesOnline, NewClasesOnline } from '../clases-online.model';

export type PartialUpdateClasesOnline = Partial<IClasesOnline> & Pick<IClasesOnline, 'id'>;

export type EntityResponseType = HttpResponse<IClasesOnline>;
export type EntityArrayResponseType = HttpResponse<IClasesOnline[]>;

@Injectable({ providedIn: 'root' })
export class ClasesOnlineService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/clases-onlines');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(clasesOnline: NewClasesOnline): Observable<EntityResponseType> {
    return this.http.post<IClasesOnline>(this.resourceUrl, clasesOnline, { observe: 'response' });
  }

  update(clasesOnline: IClasesOnline): Observable<EntityResponseType> {
    return this.http.put<IClasesOnline>(`${this.resourceUrl}/${this.getClasesOnlineIdentifier(clasesOnline)}`, clasesOnline, {
      observe: 'response',
    });
  }

  partialUpdate(clasesOnline: PartialUpdateClasesOnline): Observable<EntityResponseType> {
    return this.http.patch<IClasesOnline>(`${this.resourceUrl}/${this.getClasesOnlineIdentifier(clasesOnline)}`, clasesOnline, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClasesOnline>(`${this.resourceUrl}/${id}`, { observe: 'response' });
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
