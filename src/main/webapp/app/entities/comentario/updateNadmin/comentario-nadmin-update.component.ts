
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




import { FileVM, IFileVM } from 'app/entities/fichero/fichero.model';
import { FicheroUploadService } from 'app/entities/fichero/service/fichero-upload.service';
import { IPlanesNutricion } from 'app/entities/planes-nutricion/planes-nutricion.model';
import { PlanesNutricionService } from 'app/entities/planes-nutricion/service/planes-nutricion.service';
import { PlanesNutricionFormGroup, PlanesNutricionFormService } from 'app/entities/planes-nutricion/update/planes-nutricion-form.service';
import { QuillConfigModule } from 'ngx-quill';
import { IComentario } from '../comentario.model';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioFormGroup, ComentarioFormService } from '../update/comentario-form.service';


@Component({
  selector: 'jhi-comentario-nadmin-update',
  templateUrl: './comentario-nadmin-update.component.html',
  styleUrls: ['./comentario-nadmin-update.component.css'],
})
export class ComentarioNADMINUpdateComponent implements OnInit {
  isSaving = false;
  comentario: IComentario | null = null;

  planesNutricionSharedCollection: IPlanesNutricion[] = [];
  planesNutricion: IPlanesNutricion | null = null;
  planesNutricionCambiada: IPlanesNutricion | null = null;

  idEmpresa: string | null = null;

  editForm: ComentarioFormGroup = this.comentarioFormService.createComentarioFormGroup();

 planesentrenamientoForm: PlanesNutricionFormGroup = this.planesNutricionFormService.createPlanesNutricionFormGroup();

  quillEditor?: QuillConfigModule;

  @Output() guardado = new EventEmitter();

  documentoForm = this.fb.group({
    documento: [null, [Validators.required]],
    documentoContentType: [null, [Validators.required]],
  });
  fileName = '';
  file: any;
  files: IFileVM[] = [];

  constructor(
    protected comentarioService: ComentarioService,
    protected deportesService: DeportesService,
    protected planesNutricionService: PlanesNutricionService,
    protected comentarioFormService: ComentarioFormService,
    protected deportesFormService: DeportesFormService,
    protected planesNutricionFormService: PlanesNutricionFormService,
    protected activatedRoute: ActivatedRoute,
    protected fb: UntypedFormBuilder,
    private dataUtilService: DataUtils,
    private sanitizer: DomSanitizer,
    private ficheroUploadService: FicheroUploadService
  ) {}



  comparePlanesNutricion = (o1: IPlanesNutricion | null, o2: IPlanesNutricion | null): boolean =>
    this.planesNutricionService.comparePlanesNutricion(o1, o2);

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
    this.planesNutricionService.find(this.idEmpresa ?? '').subscribe(planesNutricion => {
      this.planesNutricion = planesNutricion.body;
      this.editForm.patchValue({ planesNutricion: this.planesNutricion, creador: 'admin' });
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
  setFileData(event: any): void {
    const files: FileList = event.target.files;
    if (files.length === 0) return;
    this.construirArray(files);
  }
  setFileDataDrag(event: any): void {
    event.preventDefault();
    const files: FileList = event.dataTransfer.files;
    if (files.length === 0) return;
    this.construirArray(files);
  }
  construirArray(files: FileList): void {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (loadEvent: any) => {
        this.files.push({
          fileName: file.name,
          contentType: file.type,
          base64: loadEvent.target.result.split(',')[1].trim() as string,
        });
      };
      reader.onerror = error => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);
    });
  }
  dragOverHandler(ev: any): void {
    ev.preventDefault();
  }
  deleteFile(number: number): void {
    this.files.splice(number, 1);
  }
  updateDocumentoForm(): IFileVM {
    return {
      ...new FileVM(),
      fileName: this.fileName,
      contentType: this.documentoForm.get('documentoContentType')!.value,
      base64: this.documentoForm.get('documento')!.value,
    };
  }
  construirImagen(file: IFileVM): void {
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + file.contentType + ';base64,' + file.base64);
  }
  
  
 
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComentario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: res => this.onSaveSuccess(res),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(res: HttpResponse<IComentario>): void {
    if (this.files.length > 0) {
      this.files.forEach(file => {
        if (res.body) {
          this.ficheroUploadService.saveFileComentarioNutricion(file, res.body.id).subscribe({
            complete: () => this.guardado.emit(),
          });
        }
      });
      this.files = [];
    }
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

    this.planesNutricionSharedCollection = this.planesNutricionService.addPlanesNutricionToCollectionIfMissing<IPlanesNutricion>(
      this.planesNutricionSharedCollection,
      comentario.planesNutricion
      
    );
  }

  protected loadRelationshipsOptions(): void {
    this.planesNutricionService
      .query()
      .pipe(map((res: HttpResponse<IPlanesNutricion[]>) => res.body ?? []))
      .pipe(
        map((planesNutricion: IPlanesNutricion[]) =>
          this.planesNutricionService.addPlanesNutricionToCollectionIfMissing<IPlanesNutricion>(
            planesNutricion,
            this.comentario?.planesNutricion
          )
        )
      )
      .subscribe((planesNutricion: IPlanesNutricion[]) => (this.planesNutricionSharedCollection = planesNutricion));
  }
  
  
}