
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
import { IDeportes } from "../deportes.model";
import { DeportesService } from "../service/deportes.service";


@Component({
    selector: 'jhi-deportes-detailDeporte',
    templateUrl: './deportes-detailDeporte.component.html',
    styleUrls: ['./deportes-detailDeporte.component.css'],
  })

  export class DeportesDetailDeporteComponent implements OnInit {
    @ViewChild('divScroll') divScroll!: ElementRef;
    deporte: IDeportes | null = null;
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
      protected deportesService: DeportesService,
      protected modalService: NgbModal,
      private cdr: ChangeDetectorRef,
      protected comentarioService: ComentarioService,
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
        if (this.deporte) {
          this.comentarioService.queryPage(this.deporte.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] }).subscribe({
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
      if (this.deporte) {
        this.comentarioService
          .queryPage(this.deporte.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] })
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
  