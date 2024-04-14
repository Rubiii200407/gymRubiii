import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs/esm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IComentario, NewComentario } from '../comentario.model';

export type PartialUpdateComentario = Partial<IComentario> & Pick<IComentario, 'id'>;

type RestOf<T extends IComentario | NewComentario> = Omit<T, 'fechaCreacion'> & {
  fechaCreacion?: string | null;
};

export type RestComentario = RestOf<IComentario>;

export type NewRestComentario = RestOf<NewComentario>;

export type PartialUpdateRestComentario = RestOf<PartialUpdateComentario>;

export type EntityResponseType = HttpResponse<IComentario>;
export type EntityArrayResponseType = HttpResponse<IComentario[]>;

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/comentario');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(comentario: NewComentario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentario);
    return this.http.post<IComentario>(this.resourceUrl, copy, { observe: 'response' });
  }

  update(comentario: IComentario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentario);
    return this.http
      .put<RestComentario>(`${this.resourceUrl}/${this.getComentarioIdentifier(comentario)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(comentario: PartialUpdateComentario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(comentario);
    return this.http
      .patch<RestComentario>(`${this.resourceUrl}/${this.getComentarioIdentifier(comentario)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestComentario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComentario[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getComentarioIdentifier(comentario: Pick<IComentario, 'id'>): number {
    return comentario.id;
  }

  compareComentario(o1: Pick<IComentario, 'id'> | null, o2: Pick<IComentario, 'id'> | null): boolean {
    return o1 && o2 ? this.getComentarioIdentifier(o1) === this.getComentarioIdentifier(o2) : o1 === o2;
  }
  

  addComentarioToCollectionIfMissing<Type extends Pick<IComentario, 'id'>>(
    comentarioCollection: Type[],
    ...comentariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const comentarios: Type[] = comentariosToCheck.filter(isPresent);
    if (comentarios.length > 0) {
      const comentarioCollectionIdentifiers = comentarioCollection.map(comentarioItem => this.getComentarioIdentifier(comentarioItem)!);
      const comentariosToAdd = comentarios.filter(comentarioItem => {
        const comentarioIdentifier = this.getComentarioIdentifier(comentarioItem);
        if (comentarioCollectionIdentifiers.includes(comentarioIdentifier)) {
          return false;
        }
        comentarioCollectionIdentifiers.push(comentarioIdentifier);
        return true;
      });
      return [...comentariosToAdd, ...comentarioCollection];
    }
    return comentarioCollection;
  }
  queryPage(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComentario[]>(`${this.resourceUrl}/deportes/${id}`, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  queryPageClase(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComentario[]>(`${this.resourceUrl}/clases-online/${id}`, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  queryPagePlan(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComentario[]>(`${this.resourceUrl}/planes-entrenamiento/${id}`, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  queryPageNutricion(id: number, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestComentario[]>(`${this.resourceUrl}/planes-nutricion/${id}`, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }
  protected convertDateFromClient<T extends IComentario | NewComentario | PartialUpdateComentario>(comentario: T): RestOf<T> {
    return {
      ...comentario,
      fechaCreacion: comentario.fechaCreacion?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restComentario: RestComentario): IComentario {
    return {
      ...restComentario,
      fechaCreacion: restComentario.fechaCreacion ? dayjs(restComentario.fechaCreacion) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestComentario>): HttpResponse<IComentario> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestComentario[]>): HttpResponse<IComentario[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
