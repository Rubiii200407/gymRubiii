import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, combineLatest, filter, switchMap, tap } from 'rxjs';

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ASC, DEFAULT_SORT_DATA, DESC, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { FilterHelper } from 'app/core/util/filter-helper.model';
import { SortService } from 'app/shared/sort/sort.service';
import { PlanesEntrenamientoDeleteDialogComponent } from '../delete/planes-entrenamiento-delete-dialog.component';
import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { EntityArrayResponseType, PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

@Component({
  selector: 'jhi-planes-entrenamiento',
  templateUrl: './planes-entrenamiento.component.html',
  styleUrls: ['./planes-entrenamiento.component.css'],
})
export class PlanesEntrenamientoComponent implements OnInit {
  planesEntrenamientos?: IPlanesEntrenamiento[];
  isLoading = false;
  totalItems = 0;
  page!: number;
  itemsPerPageOptions = [10, 20, 50, 100];
  predicate = 'id';
  ascending = true;
  filter: FilterHelper = {
    nombre: null,
    codigo: null,

   
  };
  private _itemsPerPage = 10;

  constructor(
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IPlanesEntrenamiento): number => this.planesEntrenamientoService.getPlanesEntrenamientoIdentifier(item);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
    this.load();
  });
  }

  delete(planesEntrenamiento: IPlanesEntrenamiento): void {
    const modalRef = this.modalService.open(PlanesEntrenamientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.planesEntrenamiento = planesEntrenamiento;
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
    this.isLoading = true;
    this.planesEntrenamientoService
      .queryWithPagination({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.filter,
      })
      .subscribe((res: HttpResponse<IPlanesEntrenamiento[]>) => {
        this.isLoading = false;
        this.onSuccess(res.body, res.headers);
        this.totalItems = Number(res.headers.get('X-Total-Count'));
      });
  }
  set itemsPerPage(value: number) {
    if (value !== this._itemsPerPage) {
      this._itemsPerPage = value;
      this.load();
    }
  }
  get itemsPerPage(): number {
    return this._itemsPerPage;
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
    this.planesEntrenamientos = this.refineData(dataFromBody);
  }

  protected refineData(data: IPlanesEntrenamiento[]): IPlanesEntrenamiento[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IPlanesEntrenamiento[] | null): IPlanesEntrenamiento[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.planesEntrenamientoService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
  private sort(): any {
    const result = [];
    if (this.predicate) {
      result.push(`${this.predicate},${this.ascending ? 'asc' : 'desc'}`);
    }

    return result;
  }
  private onSuccess(body: IPlanesEntrenamiento[] | null, headers: HttpHeaders): void {
    if (body) {
      const totalCountHeader = headers.get('X-Total-Count');
      this.totalItems = totalCountHeader ? Number(totalCountHeader) : 0;
      this.planesEntrenamientos = body;
    }
  }
}
