import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IComentario } from 'app/entities/comentario/comentario.model';
import { ComentarioService } from 'app/entities/comentario/service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from 'app/entities/comentario/update/comentario-form.service';
import dayjs from 'dayjs';
import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';

@Component({
  selector: 'jhi-deportes-detail',
  templateUrl: './deportes-detail.component.html',
  styleUrls: ['./deportes-detail.component.css'],
})
export class DeportesDetailComponent implements OnInit {
  @ViewChild('divScroll') divScroll!: ElementRef;
  deportes: IDeportes | null = null;
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
  cargandoChat = false;
  constructor(protected activatedRoute: ActivatedRoute,
    protected comentarioService: ComentarioService,
    protected comentarioFormService: ComentarioFormService,
    protected deportesService: DeportesService,
    private cdr: ChangeDetectorRef,
    protected modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => (this.id = params.get('id') ?? ''));
    this.cargaDatos();
  }
  cargaDatos(): void {
    this.deportesService.find(this.id).subscribe(deporte => {
      this.deportes = deporte.body;
      if (this.deportes) {
        this.comentarioService.queryPage(this.deportes.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] }).subscribe({
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

  cargarMasComentarios(): void {
    this.cargandoChat = false;
    this.numComentarios = this.numComentarios + 10;
    if (this.deportes) {
      this.comentarioService
        .queryPage(this.deportes.id, { size: this.numComentarios, sort: ['fechaCreacion,desc'] })
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

  restarDate(day1: dayjs.Dayjs | null | undefined, day2: dayjs.Dayjs | null | undefined): string {
    if (!day1 || !day2) return '';
    const day = day1.diff(day2, 'days');
    return day + ' dias';
  }
  previousState(): void {
    window.history.back();
  }
}
