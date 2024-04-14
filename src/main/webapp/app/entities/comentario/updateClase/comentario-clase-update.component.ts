import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { ClasesOnlineFormGroup, ClasesOnlineFormService } from 'app/entities/clases-online/update/clases-online-form.service';

import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';

@Component({
  selector: 'jhi-comentario-clase-update',
  templateUrl: './comentario-clase-update.component.html',
  styleUrls: ['./comentario-clase-update.component.css'],
})
export class ComentarioClaseUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  claseSharedCollection: IClasesOnline[] = [];
  clasesOnline: IClasesOnline | null = null;
  claseCambiada: IClasesOnline | null = null;

  idEmpresa = 0;
  uuid?: string;

 editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
 claseForm: ClasesOnlineFormGroup = this.claseFormService.createClasesOnlineFormGroup();



  @Output() guardado = new EventEmitter();
  documentoForm = this.fb.group({
    documento: [null, [Validators.required]],
    documentoContentType: [null, [Validators.required]],
  });
  fileName = '';
  file: any;
  constructor(
    protected comentarioService: ComentarioService,
    protected clasesService: ClasesOnlineService,
    protected comentarioFormService: ComentarioFormService,
    protected claseFormService: ClasesOnlineFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}

  compareClasesOnline = (o1: IClasesOnline | null, o2: IClasesOnline | null): boolean =>
    this.clasesService.compareClasesOnline(o1, o2);

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') ?? '';
    this.clasesService.findUUID(this.uuid).subscribe(clasesOnline => (this.clasesOnline = clasesOnline.body));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    this.editForm.patchValue({ clasesOnline: this.clasesOnline, creador: 'ANÓNIMO' });
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
