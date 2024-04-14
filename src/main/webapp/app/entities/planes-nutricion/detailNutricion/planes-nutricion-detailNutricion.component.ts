
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IComentario } from "app/entities/comentario/comentario.model";
import { ComentarioService } from 'app/entities/comentario/service/comentario.service';
import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';
  
  
  @Component({
      selector: 'jhi-planes-nutricion-detailNutricion',
      templateUrl: './planes-nutricion-detailNutricion.component.html',
      styleUrls: ['./planes-nutricion-detailNutricion.component.css'],
    })
  
    export class PlanesNutricionDetailNutricionComponent implements OnInit {
      @ViewChild('divScroll') divScroll!: ElementRef;
      planesNutricion: IPlanesNutricion | null = null;
      uuid?: string | null;
      borrar = false;
      totalComentarios = 0;
      showBajar = false;
      altoScroll = 0;
      cargandoChat = false;
      numComentarios = 10;
      comentariosBuscados: IComentario[] = [];
  
      constructor(
        protected activatedRoute: ActivatedRoute,
        protected planService: PlanesNutricionService,
        protected modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        protected comentarioService: ComentarioService,
      ) {}
    
      ngOnInit(): void {
        this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
        this.cargaDatos();
      }
    
      delete(planesNutricion: IPlanesNutricion): void {
        if (this.planesNutricion != null) {
          this.planService.delete(this.planesNutricion?.id);
        }
        const modalRef = this.modalService.open(PlanesNutricionDetailNutricionComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.planesNutricion = planesNutricion;
        modalRef.closed.subscribe({
          next: () => this.previousState(),
        });
      }
    
      previousState(): void {
        window.history.back();
      }
      cargaDatos(): void {
        this.planService.findUUID(this.uuid ?? '').subscribe(planes => {
          this.planesNutricion = planes.body;
          if (this.planesNutricion) {
            this.comentarioService.queryPageNutricion(this.planesNutricion.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] }).subscribe({
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
      cargarMasComentarios(): void {
        this.numComentarios = this.numComentarios + 10;
        if (this.planesNutricion) {
          this.comentarioService
            .queryPageNutricion(this.planesNutricion.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] })
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
  }
    