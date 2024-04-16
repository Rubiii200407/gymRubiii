import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFichero, NewFichero } from '../fichero.model';

export type PartialUpdateFichero = Partial<IFichero> & Pick<IFichero, 'id'>;

export type EntityResponseType = HttpResponse<IFichero>;
export type EntityArrayResponseType = HttpResponse<IFichero[]>;

@Injectable({ providedIn: 'root' })
export class FicheroService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fichero');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fichero: NewFichero): Observable<EntityResponseType> {
    return this.http.post<IFichero>(this.resourceUrl, fichero, { observe: 'response' });
  }

  update(fichero: IFichero): Observable<EntityResponseType> {
    return this.http.put<IFichero>(`${this.resourceUrl}/${this.getFicheroIdentifier(fichero)}`, fichero, { observe: 'response' });
  }

  partialUpdate(fichero: PartialUpdateFichero): Observable<EntityResponseType> {
    return this.http.patch<IFichero>(`${this.resourceUrl}/${this.getFicheroIdentifier(fichero)}`, fichero, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFichero>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IFichero[]>> {
    const options = createRequestOption(req);
    return this.http.get<IFichero[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  getFicheroIdentifier(fichero: Pick<IFichero, 'id'>): number {
    return fichero.id;
  }
  getFicheroDenuncia(id: number, params?: any): Observable<HttpResponse<IFichero[]>> {
    const options = createRequestOption(params);
    return this.http.get<IFichero[]>(`${this.resourceUrl}/denuncia/${id}`, {
      params: options,
      observe: 'response',
    });
  }
  getFicheroBaseDenuncia(id: number): Observable<HttpResponse<IFichero[]>> {
    return this.http.get<IFichero[]>(`${this.resourceUrl}/denuncia-base/${id}`, { observe: 'response' });
  }
}
