import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';
import { PlanesEntrenamientoFormGroup, PlanesEntrenamientoFormService } from 'app/entities/planes-entrenamiento/update/planes-entrenamiento-form.service';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';

@Component({
  selector: 'jhi-comentario-entrenamiento-update',
  templateUrl: './comentario-entrenamiento-update.component.html',
  styleUrls: ['./comentario-entrenamiento-update.component.css'],
})
export class ComentarioEntrenamientoUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

 entrenamientoSharedCollection: IPlanesEntrenamiento[] = [];
   entrenamiento: IPlanesEntrenamiento | null = null;
   entrenamientoCambiada: IPlanesEntrenamiento | null = null;

  idEmpresa = 0;
  uuid?: string;

 editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
  entrenamientoForm: PlanesEntrenamientoFormGroup = this. entrenamientoFormService.createPlanesEntrenamientoFormGroup();



  @Output() guardado = new EventEmitter();
  documentoForm = this.fb.group({
    documento: [null, [Validators.required]],
    documentoContentType: [null, [Validators.required]],
  });
  fileName = '';
  file: any;
  constructor(
    protected comentarioService: ComentarioService,
    protected  entrenamientoService: PlanesEntrenamientoService,
    protected comentarioFormService: ComentarioFormService,
    protected  entrenamientoFormService: PlanesEntrenamientoFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}

  comparePlanesEntrenamiento = (o1: IPlanesEntrenamiento | null, o2: IPlanesEntrenamiento | null): boolean =>
    this. entrenamientoService.comparePlanesEntrenamiento(o1, o2);

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
    this. entrenamientoService.findUUID(this.uuid).subscribe( entrenamiento => (this. entrenamiento =  entrenamiento.body));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    this.editForm.patchValue({ planesEntrenamiento: this. entrenamiento, creador: 'ANÓNIMO' });
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
