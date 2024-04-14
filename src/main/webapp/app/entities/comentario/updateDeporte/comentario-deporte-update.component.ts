import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { IDeportes } from 'app/entities/deportes/deportes.model';
import { DeportesService } from 'app/entities/deportes/service/deportes.service';
import { DeportesFormGroup, DeportesFormService } from 'app/entities/deportes/update/deportes-form.service';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';

@Component({
  selector: 'jhi-comentario-deporte-update',
  templateUrl: './comentario-deporte-update.component.html',
  styleUrls: ['./comentario-deporte-update.component.css'],
})
export class ComentarioDeporteUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  deporteSharedCollection: IDeportes[] = [];
  deporte: IDeportes | null = null;
  deporteCambiada: IDeportes | null = null;

  idEmpresa = 0;
  uuid?: string;

 editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
 deporteForm: DeportesFormGroup = this.deporteFormService.createDeportesFormGroup();



  @Output() guardado = new EventEmitter();
  documentoForm = this.fb.group({
    documento: [null, [Validators.required]],
    documentoContentType: [null, [Validators.required]],
  });
  fileName = '';
  file: any;
  constructor(
    protected comentarioService: ComentarioService,
    protected deportesService: DeportesService,
    protected comentarioFormService: ComentarioFormService,
    protected deporteFormService: DeportesFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}

  compareDeportes = (o1: IDeportes | null, o2: IDeportes | null): boolean =>
    this.deportesService.compareDeportes(o1, o2);

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
    this.deportesService.findUUID(this.uuid).subscribe(deporte => (this.deporte = deporte.body));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    this.editForm.patchValue({ deportes: this.deporte, creador: 'ANÓNIMO' });
    const comentario = this.comentarioFormService.getComentario(this.editForm);

    if (comentario.id !== null) {
      this.subscribeToSaveResponse(this.comentarioService.update(comentario));
    } else {
      this.subscribeToSaveResponse(this.comentarioService.create(comentario));
    }
  }

  cancel(): void {
    this.editForm.reset();
  }
 
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComentario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: res => this.onSaveSuccess(res),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(res: HttpResponse<IComentario>): void {
    this.guardado.emit();
    this.editForm.reset();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
}
