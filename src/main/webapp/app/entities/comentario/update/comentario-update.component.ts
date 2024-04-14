import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { IDeportes } from 'app/entities/deportes/deportes.model';
import { DeportesService } from 'app/entities/deportes/service/deportes.service';
import { DeportesFormGroup, DeportesFormService } from 'app/entities/deportes/update/deportes-form.service';

import { QuillConfigModule } from 'ngx-quill';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from './comentario-form.service';

@Component({
  selector: 'jhi-comentario-update',
  templateUrl: './comentario-update.component.html',
  styleUrls: ['./comentario-update.component.scss'],
})
export class ComentarioUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  deportesSharedCollection: IDeportes[] = [];
  deportes: IDeportes | null = null;
  deportesCambiada: IDeportes | null = null;



  idEmpresa: string | null = null;

  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();
 deportesForm: DeportesFormGroup = this.deportesFormService.createDeportesFormGroup();


  quillEditor?: QuillConfigModule;

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
    protected deportesFormService: DeportesFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}

  compareDeportes = (o1: IDeportes | null, o2: IDeportes | null): boolean =>
    this.deportesService.compareDeportes(o1, o2);

  ngOnInit(): void {
    this.quillEditor = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
      ],
    };

    this.activatedRoute.queryParamMap.subscribe(params => (this.idEmpresa = params.get('id') ?? ''));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.deportesService.find(this.idEmpresa ?? '').subscribe(deportes => {
      this.deportes = deportes.body;
      this.editForm.patchValue({ deportes: this.deportes, creador: 'admin' });
      const comentario = this.comentarioFormService.getComentario(this.editForm);
      if (comentario.id !== null) {
        this.subscribeToSaveResponse(this.comentarioService.update(comentario));
      } else {
        this.subscribeToSaveResponse(this.comentarioService.create(comentario));
      }
    });
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

  protected updateForm(comentario: IComentario): void {
    this.comentario = comentario;
    this.comentarioFormService.resetForm(this.editForm, comentario);

    this.deportesSharedCollection = this.deportesService.addDeportesToCollectionIfMissing<IDeportes>(
      this.deportesSharedCollection,
      comentario.deportes
      
    );
  }

  protected loadRelationshipsOptions(): void {
    this.deportesService
      .query()
      .pipe(map((res: HttpResponse<IDeportes[]>) => res.body ?? []))
      .pipe(
        map((deportes: IDeportes[]) =>
          this.deportesService.addDeportesToCollectionIfMissing<IDeportes>(
            deportes,
            this.comentario?.deportes
          )
        )
      )
      .subscribe((deportes: IDeportes[]) => (this.deportesSharedCollection = deportes));
  }
  
  
}
