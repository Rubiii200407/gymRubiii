import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDeportes } from "../deportes.model";
import { DeportesService } from "../service/deportes.service";


@Component({
    selector: 'jhi-deportes-detailDeporte',
    templateUrl: './deportes-detailDeporte.component.html',
  })

  export class DeportesDetailDeporteComponent implements OnInit {
    deporte: IDeportes | null = null;
    uuid?: string | null;
    borrar = false;

  
    constructor(
      protected activatedRoute: ActivatedRoute,
      protected deportesService: DeportesService,
      protected modalService: NgbModal
    ) {}
  
    ngOnInit(): void {
      this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
      this.cargaDatos();
    }
  
    delete(deportes: IDeportes): void {
      if (this.deporte != null) {
        this.deportesService.delete(this.deporte?.id);
      }
      const modalRef = this.modalService.open(DeportesDetailDeporteComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.deportes = deportes;
      modalRef.closed.subscribe({
        next: () => this.previousState(),
      });
    }
  
    previousState(): void {
      window.history.back();
    }
    cargaDatos(): void {
        this.deportesService.findUUID(this.uuid ?? '').subscribe(deportes => {
          this.deporte = deportes.body;
        
          });
      }
}
  