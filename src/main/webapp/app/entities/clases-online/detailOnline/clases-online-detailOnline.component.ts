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
    claseOnline: IClasesOnline | null = null;
    uuid?: string | null |null;
    borrar = false;

  
    constructor(
      protected activatedRoute: ActivatedRoute,
      protected clasesOnlineService: ClasesOnlineService,
      protected modalService: NgbModal
    ) {}
  
    ngOnInit(): void {
      this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
      this.cargaDatos();
    
    }
  
    delete(clasesOnline: IClasesOnline): void {
      if (this.claseOnline != null) {
        this.clasesOnlineService.delete(this.claseOnline?.id);
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
    cargaDatos(): void {
      if (this.uuid) {
        this.clasesOnlineService.findUUID(this.uuid).subscribe(
          clasesOnline => {
            this.claseOnline = clasesOnline.body;
            
          }
        );
        }        
    }
  }
  