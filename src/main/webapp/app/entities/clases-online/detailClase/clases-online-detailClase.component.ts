
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IComentario } from "app/entities/comentario/comentario.model";
import { ComentarioService } from 'app/entities/comentario/service/comentario.service';
import { IFichero } from 'app/entities/fichero/fichero.model';
import { FicheroUploadService } from 'app/entities/fichero/service/fichero-upload.service';
import { FicheroService } from 'app/entities/fichero/service/fichero.service';
import dayjs from 'dayjs';
import { IClasesOnline } from '../clases-online.model';
import { ClasesOnlineService } from '../service/clases-online.service';
  
  
  @Component({
      selector: 'jhi-clases-online-detailClase',
      templateUrl: './clases-online-detailClase.component.html',
      styleUrls: ['./clases-online-detailClase.component.css'],
    })
  
    export class ClasesOnlineDetailClaseComponent implements OnInit {
      @ViewChild('divScroll') divScroll!: ElementRef;
    @ViewChild('divScrollFichero') divScrollFichero!: ElementRef;
      clasesOnline: IClasesOnline | null = null;
      uuid?: string | null;
      borrar = false;
      totalComentarios = 0;
      showBajar = false;
      altoScroll = 0;
      cargandoChat = false;
      numComentarios = 10;
      comentariosBuscados: IComentario[] = [];
      ficheros: IFichero[] = [];
    numFicheros = 4;
    totalFicheros = 0;
  
      constructor(
        protected activatedRoute: ActivatedRoute,
        protected  claseService: ClasesOnlineService,
        protected modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        protected comentarioService: ComentarioService,
        protected sanitizer:DomSanitizer,
        private ficheroUploadService: FicheroUploadService,
        private ficheroService: FicheroService,
      ) {}
    
      ngOnInit(): void {
        this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
        this.cargaDatos();
      }
    
      delete(clases: IClasesOnline): void {
        if (this.clasesOnline != null) {
          this.claseService.delete(this.clasesOnline?.id);
        }
        const modalRef = this.modalService.open(ClasesOnlineDetailClaseComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.clasesonline = this.clasesOnline;
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
        this.claseService.findUUID(this.uuid ?? '').subscribe(clases => {
          this.clasesOnline= clases.body;
          if (this.clasesOnline) {
            this.comentarioService.queryPageClase(this.clasesOnline.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] }).subscribe({
              next: comentarios => {
                if (comentarios.body) {
                  this.comentariosBuscados = comentarios.body.reverse();
                }
                this.totalComentarios = Number(comentarios.headers.get('X-Total-Count'));
              },
              });
            }
          }
      )}
      cargarMasFicheros(): void {
        this.numFicheros = this.numFicheros + 4;
        if (this.clasesOnline?.id) {
          this.ficheroService.getFicheroDenuncia(this.clasesOnline.id, { size: this.numFicheros, sort: ['id,desc'] }).subscribe(res => {
            if (res.body) {
              this.ficheros = res.body;
            }
            this.totalFicheros = Number(res.headers.get('X-Total-Count'));
          });
        }
      }
      cargarMasComentarios(): void {
        this.numComentarios = this.numComentarios + 10;
        if (this.clasesOnline) {
          this.comentarioService
            .queryPage(this.clasesOnline.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] })
            .subscribe(comentarios => {
              if (comentarios.body) {
                this.comentariosBuscados = comentarios.body.reverse();
              }
             
              this.totalComentarios = Number(comentarios.headers.get('X-Total-Count'));
              Promise.resolve().then(() => {
                this.cdr.detectChanges();
                setTimeout(() => this.ajustarScroll(), 100);
              });
            });
        }
      }
      scroll(): void {
        const elemento = this.divScroll.nativeElement;
        if (elemento) {
          console.log(elemento.scrollHeight);
          elemento.scrollTop = elemento.scrollHeight;
        }
      }
      @HostListener('window:scroll', ['$event'])
      onScroll(event: any): void {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
          this.showBajar = true;
        } else {
          this.showBajar = false;
        }
        if (this.cargandoChat) {
          if (event.target.scrollTop <= 200 && this.numComentarios < this.totalComentarios) {
            this.cargandoChat = false;
            this.altoScroll = event.target.scrollHeight - event.target.scrollTop;
            this.cargarMasComentarios();
            console.log(event.target.scrollHeight + 'Dentro de la funcion');
          }
        }
      }
      ajustarScroll(): void {
        const elemento = this.divScroll.nativeElement;
        console.log(elemento.scrollHeight);
        console.log(this.altoScroll);
        if (elemento.scrollHeight > this.altoScroll) {
          elemento.scrollTop = elemento.scrollHeight - this.altoScroll;
          console.log(elemento.scrollTop);
        }
        this.cargandoChat = true;
      }
      @HostListener('window:scroll', ['$event'])
      onScrollFichero(event: any): void {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 10 && this.numFicheros < this.totalFicheros) {
          this.cargarMasFicheros();
        }
      }
      restarDate(day1: dayjs.Dayjs | null | undefined, day2: dayjs.Dayjs | null | undefined): string {
        if (!day1 || !day2) return '';
        const day = day1.diff(day2, 'days');
        return day + ' dias';
      }
      descargar(fichero: IFichero): void {
        const nombre = fichero.nombre.substring(0, fichero.nombre.lastIndexOf('-'));
        this.ficheroUploadService.getDownloadFile(fichero.id, nombre).subscribe();
      }
    }