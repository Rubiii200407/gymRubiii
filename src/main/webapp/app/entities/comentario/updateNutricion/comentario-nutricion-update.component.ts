import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { IPlanesNutricion } from 'app/entities/planes-nutricion/planes-nutricion.model';
import { PlanesNutricionService } from 'app/entities/planes-nutricion/service/planes-nutricion.service';
import { PlanesNutricionFormGroup, PlanesNutricionFormService } from 'app/entities/planes-nutricion/update/planes-nutricion-form.service';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';

@Component({
  selector: 'jhi-comentario-nutricion-update',
  templateUrl: './comentario-nutricion-update.component.html',
  styleUrls: ['./comentario-nutricion-update.component.css'],
})
export class ComentarioNutricionUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  planesNutricionSharedCollection: IPlanesNutricion[] = [];
 planesNutricion: IPlanesNutricion | null = null;
 planesNutricionCambiada: IPlanesNutricion | null = null;

  idEmpresa = 0;
  uuid?: string;

 editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
  nutricionForm: PlanesNutricionFormGroup = this. nutricionFormService.createPlanesNutricionFormGroup();



  @Output() guardado = new EventEmitter();
  documentoForm = this.fb.group({
    documento: [null, [Validators.required]],
    documentoContentType: [null, [Validators.required]],
  });
  fileName = '';
  file: any;
  constructor(
    protected comentarioService: ComentarioService,
    protected  nutricionService: PlanesNutricionService,
    protected comentarioFormService: ComentarioFormService,
    protected  nutricionFormService: PlanesNutricionFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}

  comparePlanesNutricion = (o1: IPlanesNutricion | null, o2: IPlanesNutricion | null): boolean =>
    this. nutricionService.comparePlanesNutricion(o1, o2);

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
    this. nutricionService.findUUID(this.uuid).subscribe( planesNutricion => (this. planesNutricion =  planesNutricion.body));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    this.editForm.patchValue({ planesNutricion: this. planesNutricion, creador: 'ANÓNIMO' });
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
