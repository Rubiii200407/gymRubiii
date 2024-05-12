import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IComentario } from 'app/entities/comentario/comentario.model';
import { ComentarioDeleteDialogComponent } from 'app/entities/comentario/delete/comentario-delete-dialog.component';
import { ComentarioService } from 'app/entities/comentario/service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from 'app/entities/comentario/update/comentario-form.service';
import { FicheroDeleteDialogComponent } from 'app/entities/fichero/delete/fichero-delete-dialog.component';
import { IFichero } from 'app/entities/fichero/fichero.model';
import { FicheroUploadService } from 'app/entities/fichero/service/fichero-upload.service';
import { FicheroService } from 'app/entities/fichero/service/fichero.service';
import dayjs from 'dayjs';
import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';

@Component({
  selector: 'jhi-planes-entrenamiento-detail',
  templateUrl: './planes-entrenamiento-detail.component.html',
  styleUrls: ['./planes-entrenamiento-detail.component.css'],
})
export class PlanesEntrenamientoDetailComponent implements OnInit {
  @ViewChild('divScroll') divScroll!: ElementRef;
  @ViewChild('divScrollFichero') divScrollFichero!: ElementRef;
  planesEntrenamiento: IPlanesEntrenamiento | null = null;
  comentarios: IComentario[] = [];
  comentariosBuscados: IComentario[] = [];
  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
  id: string = '';
  numFicheros = 4;
  numComentarios = 10;
  totalFicheros = 0;
  totalComentarios = 0;
  showBajar = false;
  altoScroll = 0;
  uuid?: string | null;
  cargandoChat = false;
  ficheros: IFichero[] = [];
  constructor(protected activatedRoute: ActivatedRoute,
    protected comentarioService: ComentarioService,
    protected comentarioFormService: ComentarioFormService,
    protected planService: PlanesEntrenamientoService,
    private cdr: ChangeDetectorRef,
    protected modalService: NgbModal,
    private ficheroUploadService: FicheroUploadService,
    private ficheroService: FicheroService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => (this.id = params.get('id') ?? ''));
    this.cargaDatos();
  }
  cargaDatos(): void {
    this.planService.find(this.id).subscribe(plan => {
      this.planesEntrenamiento = plan.body;
      if (this.planesEntrenamiento) {
        this.comentarioService.queryPagePlan(this.planesEntrenamiento.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] }).subscribe({
          next: comentarios => {
            if (comentarios.body) {
              this.comentariosBuscados = comentarios.body.reverse();
              this.totalComentarios = Number(comentarios.headers.get('X-Total-Count'));
            }
          },
        });
        
      }
    });
  }
  eliminarFichero(fichero: IFichero): void {
    const modalRef = this.modalService.open(FicheroDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fichero = fichero;
    modalRef.closed.subscribe(() => {
      this.cargaDatos();
    });
  }
  eliminarComentario(comentario: IComentario): void {
    const modalRef = this.modalService.open(ComentarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.comentario = comentario;
    modalRef.closed.subscribe(() => {
      this.cargaDatos();
    });
  }
  descargar(fichero: IFichero): void {
    const nombre = fichero.nombre.substring(0, fichero.nombre.lastIndexOf('-'));
    this.ficheroUploadService.getDownloadFile(fichero.id, nombre).subscribe();
  }

  cargarMasFicheros(): void {
    this.numFicheros = this.numFicheros + 4;
    if (this.planesEntrenamiento?.id) {
      this.ficheroService.getFicheroDenuncia(this.planesEntrenamiento.id, { size: this.numFicheros, sort: ['id,desc'] }).subscribe(res => {
        if (res.body) {
          this.ficheros = res.body;
        }
        this.totalFicheros = Number(res.headers.get('X-Total-Count'));
      });
    }
  }
  cargarMasComentarios(): void {
    this.cargandoChat = false;
    this.numComentarios = this.numComentarios + 10;
    if (this.planesEntrenamiento) {
      this.comentarioService
        .queryPage(this.planesEntrenamiento.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] })
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
      }
    }
  }
  ajustarScroll(): void {
    const elemento = this.divScroll.nativeElement;
    if (elemento.scrollHeight > this.altoScroll) {
      elemento.scrollTop = elemento.scrollHeight - this.altoScroll;
    }
    this.cargandoChat = true;
  }
  @HostListener('window:scroll', ['$event'])
  onScrollFichero(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 10) {
      this.cargarMasFicheros();
    }
  }
  restarDate(day1: dayjs.Dayjs | null | undefined, day2: dayjs.Dayjs | null | undefined): string {
    if (!day1 || !day2) return '';
    const day = day1.diff(day2, 'days');
    return day + ' dias';
  }


  previousState(): void {
    window.history.back();
  }
}


