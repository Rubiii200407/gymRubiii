import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataUtils } from 'app/core/util/data-util.service';

import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { ClasesOnlineService } from 'app/entities/clases-online/service/clases-online.service';
import { ClasesOnlineFormGroup, ClasesOnlineFormService } from 'app/entities/clases-online/update/clases-online-form.service';
import { QuillConfigModule } from 'ngx-quill';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';


@Component({
  selector: 'jhi-comentario-cadmin-update',
  templateUrl: './comentario-cadmin-update.component.html',
  styleUrls: ['./comentario-cadmin-update.component.css'],
})
export class ComentarioCADMINUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  clasesOnlineSharedCollection: IClasesOnline[] = [];
  clasesOnline: IClasesOnline | null = null;
  clasesOnlineCambiada: IClasesOnline | null = null;

  idEmpresa: string | null = null;

  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();

 claseForm: ClasesOnlineFormGroup = this.claseFormService.createClasesOnlineFormGroup();

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
    protected claseService: ClasesOnlineService,
    protected comentarioFormService: ComentarioFormService,
    protected claseFormService: ClasesOnlineFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
  ) {}



  compareClasesOnline = (o1: IClasesOnline | null, o2: IClasesOnline | null): boolean =>
    this.claseService.compareClasesOnline(o1, o2);

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
    this.claseService.find(this.idEmpresa ?? '').subscribe(clasesOnline => {
      this.clasesOnline = clasesOnline.body;
      this.editForm.patchValue({ clasesOnline: this.clasesOnline, creador: 'admin' });
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

    this.clasesOnlineSharedCollection = this.claseService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(
      this.clasesOnlineSharedCollection,
      comentario.clasesOnline
      
    );
  }

  protected loadRelationshipsOptions(): void {
    this.claseService
      .query()
      .pipe(map((res: HttpResponse<IClasesOnline[]>) => res.body ?? []))
      .pipe(
        map((clasesOnline: IClasesOnline[]) =>
          this.claseService.addClasesOnlineToCollectionIfMissing<IClasesOnline>(
            clasesOnline,
            this.comentario?.clasesOnline
          )
        )
      )
      .subscribe((clasesOnline: IClasesOnline[]) => (this.clasesOnlineSharedCollection = clasesOnline));
  }
  
  
}
