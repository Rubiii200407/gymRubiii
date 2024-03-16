import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
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
      protected modalService: NgbModal,
      protected sanitizer:DomSanitizer
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
        this.clasesOnlineService.findUUID(this.uuid).subscribe(
          clasesOnline => {
            this.claseOnline = clasesOnline.body;
            
          }
        );
        }        
    }
  }
  