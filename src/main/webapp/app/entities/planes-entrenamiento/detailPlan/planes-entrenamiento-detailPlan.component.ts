import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IPlanesEntrenamiento } from "../planes-entrenamiento.model";
import { PlanesEntrenamientoService } from "../service/planes-entrenamiento.service";

@Component({
    selector: 'jhi-planes-entrenamiento-detailPlan',
    templateUrl: './planes-entrenamiento-detailPlan.component.html',
  })

  export class PlanesEntrenamientoDetailPlanComponent implements OnInit {
    planesEntrenamiento: IPlanesEntrenamiento | null = null;
    uuid?: string | null |null;
    borrar = false;


  
    constructor(
      protected activatedRoute: ActivatedRoute,
      protected planesEntrenamientoService: PlanesEntrenamientoService,
      protected modalService: NgbModal,
      protected sanitizer:DomSanitizer
    ) {}
  
    ngOnInit(): void {
      this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
      this.cargaDatos();
    
    }
  
    delete(planesEntrenamiento: IPlanesEntrenamiento): void {
      if (this.planesEntrenamiento != null) {
        this.planesEntrenamientoService.delete(this.planesEntrenamiento?.id);
      }
      const modalRef = this.modalService.open(PlanesEntrenamientoDetailPlanComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.planesEntrenamiento = planesEntrenamiento;
      modalRef.closed.subscribe({
        next: () => this.previousState(),
      });
    }
  
    previousState(): void {
      window.history.back();
    }
    getVideoIframe(url:string|null|undefined) {

      if (!url) {
          return this.sanitizer.bypassSecurityTrustResourceUrl("");
      }
      const results = url.match('[\\?&]v=([^&#]*)');
      const videoId   = (results === null) ? url : results[1];
   
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);   
  }
  
  
    cargaDatos(): void {
      if (this.uuid) {
        this.planesEntrenamientoService.findUUID(this.uuid).subscribe(
          planesEntrenamiento => {
            this.planesEntrenamiento = planesEntrenamiento.body;
            
          }
        );
        }        
    }
  }
  