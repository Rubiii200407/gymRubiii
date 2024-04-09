import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, combineLatest, filter, switchMap, tap } from 'rxjs';

import { ASC, DEFAULT_SORT_DATA, DESC, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { SortService } from 'app/shared/sort/sort.service';
import { PlanNutricionEntrenamientoDeleteDialogComponent } from '../delete/plan-nutricion-entrenamiento-delete-dialog.component';
import { IPlanNutricionEntrenamiento } from '../plan-nutricion-entrenamiento.model';
import { EntityArrayResponseType, PlanNutricionEntrenamientoService } from '../service/plan-nutricion-entrenamiento.service';


@Component({
  selector: 'jhi-plan-nutricion-entrenamiento',
  templateUrl: './plan-nutricion-entrenamiento.component.html',
})
export class PlanNutricionEntrenamientoComponent implements OnInit {
  planNutricionEntrenamientos?: IPlanNutricionEntrenamiento[];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  constructor(
    protected planNutricionEntrenamientoService: PlanNutricionEntrenamientoService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IPlanNutricionEntrenamiento): number => this.planNutricionEntrenamientoService.getPlanNutricionEntrenamientoIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  delete(planNutricionEntrenamiento: IPlanNutricionEntrenamiento): void {
    const modalRef = this.modalService.open(PlanNutricionEntrenamientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.planNutricionEntrenamiento = planNutricionEntrenamiento;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.planNutricionEntrenamientos = this.refineData(dataFromBody);
  }

  protected refineData(data: IPlanNutricionEntrenamiento[]): IPlanNutricionEntrenamiento[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IPlanNutricionEntrenamiento[] | null): IPlanNutricionEntrenamiento[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.planNutricionEntrenamientoService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
