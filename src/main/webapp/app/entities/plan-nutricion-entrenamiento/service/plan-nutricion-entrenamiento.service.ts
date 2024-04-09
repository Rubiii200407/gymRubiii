import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPlanNutricionEntrenamiento, NewPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';


export type PartialUpdatePlanNutricionEntrenamiento = Partial<IPlanNutricionEntrenamiento> & Pick<IPlanNutricionEntrenamiento, 'id'>;

export type EntityResponseType = HttpResponse<IPlanNutricionEntrenamiento>;
export type EntityArrayResponseType = HttpResponse<IPlanNutricionEntrenamiento[]>;

@Injectable({ providedIn: 'root' })
export class PlanNutricionEntrenamientoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/plan-nutricion-entrenamiento');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(planNutricionEntrenamiento: NewPlanNutricionEntrenamiento): Observable<EntityResponseType> {
    return this.http.post<IPlanNutricionEntrenamiento>(this.resourceUrl, planNutricionEntrenamiento, { observe: 'response' });
  }

  update(planNutricionEntrenamiento: IPlanNutricionEntrenamiento): Observable<EntityResponseType> {
    return this.http.put<IPlanNutricionEntrenamiento>(
      `${this.resourceUrl}/${this.getPlanNutricionEntrenamientoIdentifier(planNutricionEntrenamiento)}`,
      planNutricionEntrenamiento,
      { observe: 'response' }
    );
  }

  partialUpdate(planNutricionEntrenamiento: PartialUpdatePlanNutricionEntrenamiento): Observable<EntityResponseType> {
    return this.http.patch<IPlanNutricionEntrenamiento>(
      `${this.resourceUrl}/${this.getPlanNutricionEntrenamientoIdentifier(planNutricionEntrenamiento)}`,
      planNutricionEntrenamiento,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlanNutricionEntrenamiento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlanNutricionEntrenamiento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPlanNutricionEntrenamientoIdentifier(planNutricionEntrenamiento: Pick<IPlanNutricionEntrenamiento, 'id'>): number {
    return planNutricionEntrenamiento.id;
  }

  comparePlanNutricionEntrenamiento(o1: Pick<IPlanNutricionEntrenamiento, 'id'> | null, o2: Pick<IPlanNutricionEntrenamiento, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanNutricionEntrenamientoIdentifier(o1) === this.getPlanNutricionEntrenamientoIdentifier(o2) : o1 === o2;
  }

  addPlanNutricionEntrenamientoToCollectionIfMissing<Type extends Pick<IPlanNutricionEntrenamiento, 'id'>>(
    planNutricionEntrenamientoCollection: Type[],
    ...planNutricionEntrenamientosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const planNutricionEntrenamientos: Type[] = planNutricionEntrenamientosToCheck.filter(isPresent);
    if (planNutricionEntrenamientos.length > 0) {
      const planNutricionEntrenamientoCollectionIdentifiers = planNutricionEntrenamientoCollection.map(
        planNutricionEntrenamientoItem => this.getPlanNutricionEntrenamientoIdentifier(planNutricionEntrenamientoItem)!
      );
      const planNutricionEntrenamientosToAdd = planNutricionEntrenamientos.filter(planNutricionEntrenamientoItem => {
        const planNutricionEntrenamientoIdentifier = this.getPlanNutricionEntrenamientoIdentifier(planNutricionEntrenamientoItem);
        if (planNutricionEntrenamientoCollectionIdentifiers.includes(planNutricionEntrenamientoIdentifier)) {
          return false;
        }
        planNutricionEntrenamientoCollectionIdentifiers.push(planNutricionEntrenamientoIdentifier);
        return true;
      });
      return [...planNutricionEntrenamientosToAdd, ...planNutricionEntrenamientoCollection];
    }
    return planNutricionEntrenamientoCollection;
  }
}
