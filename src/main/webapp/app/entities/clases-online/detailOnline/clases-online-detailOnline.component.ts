import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IClasesOnline } from "../clases-online.model";
import { ClasesOnlineService } from "../service/clases-online.service";

@Component({
    selector: 'jhi-clases-online-detailOnline',
    templateUrl: './clases-online-detailOnline.component.html',
  })

  export class ClasesOnlineDetailOnlineComponent implements OnInit {
    clasesOnline: IClasesOnline | null = null;
    uuid?: string | null;
    borrar = false;

  
    constructor(
      protected activatedRoute: ActivatedRoute,
      protected clasesOnlineService: ClasesOnlineService,
      protected modalService: NgbModal
    ) {}
  
    ngOnInit(): void {
      this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
    
    }
  
    delete(clasesOnline: IClasesOnline): void {
      if (this.clasesOnline != null) {
        this.clasesOnlineService.delete(this.clasesOnline?.id);
      }
      const modalRef = this.modalService.open(ClasesOnlineDetailOnlineComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.clasesOnline = clasesOnline;
      modalRef.closed.subscribe({
        next: () => this.previousState(),
      });
    }
  
    previousState(): void {
      window.history.back();
    }
}
  