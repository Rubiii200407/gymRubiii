import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, combineLatest, filter, switchMap, tap } from 'rxjs';

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ASC, DEFAULT_SORT_DATA, DESC, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { FilterHelper } from 'app/core/util/filter-helper.model';
import { SortService } from 'app/shared/sort/sort.service';
import dayjs, { Dayjs } from 'dayjs';
import { DeportesDeleteDialogComponent } from '../delete/deportes-delete-dialog.component';
import { IDeportes } from '../deportes.model';
import { DeportesService, EntityArrayResponseType } from '../service/deportes.service';

@Component({
  selector: 'jhi-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css'],
})
export class DeportesComponent implements OnInit {
  deportes?: IDeportes[];
  isLoading = false;
  totalItems = 0;
  page!: number;
  itemsPerPageOptions = [10, 20, 50, 100];
  predicate = 'id';
  ascending = true;
  filter: FilterHelper = {
    nombre: null,
    codigo: null,
    fechaInicio:  null as Dayjs | null,
    fechaFin:  null as Dayjs | null,
   
  };
  private _itemsPerPage = 10;
  constructor(
    protected deportesService: DeportesService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IDeportes): number => this.deportesService.getDeportesIdentifier(item);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.page = params['page'] || 1;
    this.load();
  });
}
  

  delete(deportes: IDeportes,event: MouseEvent): void {
    const modalRef = this.modalService.open(DeportesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.deportes = deportes;
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
      event?.stopPropagation();
  }
  verDeportes(id: number) {
    this.router.navigate(['/deportes/view'], { queryParams: { id: id } });
  }

  load(): void {
    this.isLoading = true;
    this.deportesService
      .queryWithPagination({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.filter,
      })
      .subscribe((res: HttpResponse<IDeportes[]>) => {
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
  setFechaInicio(event: any) {
    const fechaInicioString = (event.target as HTMLInputElement).value;
    this.filter.fechaInicio = fechaInicioString ? dayjs(fechaInicioString) : null;
    this.setFechas();
  }
  setFechaFin(event: any) {
    const fechaFinString = (event.target as HTMLInputElement).value;
    this.filter.fechaFin = fechaFinString ? dayjs(fechaFinString) : null;
    this.setFechas();
  }
  setFechas() {
    this.load();
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
    this.deportes = this.refineData(dataFromBody);
  }

  protected refineData(data: IDeportes[]): IDeportes[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IDeportes[] | null): IDeportes[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.deportesService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
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
  private onSuccess(body: IDeportes[] | null, headers: HttpHeaders): void {
    if (body) {
      const totalCountHeader = headers.get('X-Total-Count');
      this.totalItems = totalCountHeader ? Number(totalCountHeader) : 0;
      this.deportes = body;
    }
  }
}
