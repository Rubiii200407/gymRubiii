import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';
import { DeportesService } from 'app/entities/deportes/service/deportes.service';
import { DeportesFormService } from 'app/entities/deportes/update/deportes-form.service';


import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';
import { PlanesEntrenamientoService } from 'app/entities/planes-entrenamiento/service/planes-entrenamiento.service';
import { PlanesEntrenamientoFormGroup, PlanesEntrenamientoFormService } from 'app/entities/planes-entrenamiento/update/planes-entrenamiento-form.service';
import { QuillConfigModule } from 'ngx-quill';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';


@Component({
  selector: 'jhi-comentario-eadmin-update',
  templateUrl: './comentario-eadmin-update.component.html',
  styleUrls: ['./comentario-eadmin-update.component.css'],
})
export class ComentarioEADMINUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  planesEntrenamientoSharedCollection: IPlanesEntrenamiento[] = [];
  planesEntrenamiento: IPlanesEntrenamiento | null = null;
  planesEntrenamientoCambiada: IPlanesEntrenamiento | null = null;

  idEmpresa: string | null = null;

  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();

 planesentrenamientoForm: PlanesEntrenamientoFormGroup = this.planesEntrenamientoFormService.createPlanesEntrenamientoFormGroup();

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
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected comentarioFormService: ComentarioFormService,
    protected deportesFormService: DeportesFormService,
    protected planesEntrenamientoFormService: PlanesEntrenamientoFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}



  comparePlanesEntrenamiento = (o1: IPlanesEntrenamiento | null, o2: IPlanesEntrenamiento | null): boolean =>
    this.planesEntrenamientoService.comparePlanesEntrenamiento(o1, o2);

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
    this.planesEntrenamientoService.find(this.idEmpresa ?? '').subscribe(planesEntrenamiento => {
      this.planesEntrenamiento = planesEntrenamiento.body;
      this.editForm.patchValue({ planesEntrenamiento: this.planesEntrenamiento, creador: 'admin' });
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

    this.planesEntrenamientoSharedCollection = this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
      this.planesEntrenamientoSharedCollection,
      comentario.planesEntrenamiento
      
    );
  }

  protected loadRelationshipsOptions(): void {
    this.planesEntrenamientoService
      .query()
      .pipe(map((res: HttpResponse<IPlanesEntrenamiento[]>) => res.body ?? []))
      .pipe(
        map((planesEntrenamiento: IPlanesEntrenamiento[]) =>
          this.planesEntrenamientoService.addPlanesEntrenamientoToCollectionIfMissing<IPlanesEntrenamiento>(
            planesEntrenamiento,
            this.comentario?.planesEntrenamiento
          )
        )
      )
      .subscribe((planesEntrenamiento: IPlanesEntrenamiento[]) => (this.planesEntrenamientoSharedCollection = planesEntrenamiento));
  }
  
  
}
