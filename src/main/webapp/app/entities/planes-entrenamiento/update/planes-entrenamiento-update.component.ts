import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPlanNutricionEntrenamiento } from 'app/entities/plan-nutricion-entrenamiento/plan-nutricion-entrenamiento.model';
import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { PlanesEntrenamientoService } from '../service/planes-entrenamiento.service';
import { PlanesEntrenamientoFormGroup, PlanesEntrenamientoFormService } from './planes-entrenamiento-form.service';

@Component({
  selector: 'jhi-planes-entrenamiento-update',
  templateUrl: './planes-entrenamiento-update.component.html',
  styleUrls: ['./planes-entrenamiento-update.component.css'],
})
export class PlanesEntrenamientoUpdateComponent implements OnInit {
  isSaving = false;
  planesEntrenamiento: IPlanesEntrenamiento | null = null;
  planSeleccionado?:string|null;
  codigo?: string;
  nuevaConsulta = true;
  uuid?:string
  errorAlGuardar:boolean=false;
  errorAlBuscarCodigo:boolean=false;
  guardado=false;
  seleccionOpcion:boolean=false;
  codigoNoExiste = false;
  planBuscada: IPlanesEntrenamiento | null = null;
  codigoBusqueda = '';
  editForm: PlanesEntrenamientoFormGroup = this.planesEntrenamientoFormService.createPlanesEntrenamientoFormGroup();
  detallesPlan:Record<string,string>= {
    "Definicion": "La definicion  significa perder la mayor cantidad de grasa posible sin perder músculo, ",
    "RecomposicionCorporal": "Una mejora de la composición corporal que busca la pérdida de grasa y la ganancia de masa muscular al mismo tiempo",
    "Volumen":"Aumentar volumen significa aumentar la masa muscular y hacer que los músculos sean más grandes",
    
  };
  instruccionesPlan:Record<string,string>= {
    "Definicion": "Para hacer una definicion es importante que te mantengas activos ya sea haciendo deporte o yendo a gimnasio,pulse guardar para saber mas informacion de como hacerlo bien",
    "RecomposicionCorporal": "Para hacer una reocmposicion corparal es importante hacer un pequeño deficit calorico y hacer ejercicio ya sea gimnasio o deporte,pulse guardar para saber mas informacion de como hacerlo bien",
    "Volumen":"Es muy importante el tema de la comida tienes que comer mas de lo habitual y apuntarte al gimansio y hacer entrenmientos de fuerza,pulse guardar para saber mas informacion de como hacerlo bien",
    
  };
  descripcionPlan :string=""
  descripcionInstruccion :string=""
  planNutricionEntrenamiento: IPlanNutricionEntrenamiento[] = [];
  planNutricionEntrenamientos: IPlanNutricionEntrenamiento[] = [];
  constructor(
    protected planesEntrenamientoService: PlanesEntrenamientoService,
    protected planesEntrenamientoFormService: PlanesEntrenamientoFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesEntrenamiento }) => {
      this.planesEntrenamiento = planesEntrenamiento;
      if (planesEntrenamiento) {
        this.updateForm(planesEntrenamiento);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.guardado = true;
    this.isSaving = true;
    const planesEntrenamiento = this.planesEntrenamientoFormService.getPlanesEntrenamiento(this.editForm);
    if (planesEntrenamiento.id !== null) {
      this.subscribeToSaveResponse(this.planesEntrenamientoService.update(planesEntrenamiento));
    } else {
      this.planesEntrenamientoService.create(planesEntrenamiento).subscribe(
        (plan) => {
          this.codigo = plan.body?.codigo ?? '';
          this.descargarCodigo(this.codigo);
        },
      );
    }
 
}
pantallaCreacionEntrenamiento(): void {
  this.guardado = false;
  this.editForm.reset();
  window.location.reload();
}
  descargarCodigo(codigo: string): void {
    const blob = new Blob([codigo], { type: 'text/plain' });
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = data;
    link.download = 'codigo_de_seguimiento';
    link.click();
    window.URL.revokeObjectURL(data);
  }
  buscarUUID(): void {
   this.errorAlBuscarCodigo=false;
      this.planesEntrenamientoService.findUUID(this.codigoBusqueda).subscribe(
        plan => {
          if (plan !== null) {
            this.planBuscada = plan.body;
            this.codigoNoExiste = false;
          } else {
            this.planBuscada = null;
            this.codigoNoExiste = true;
     
          }
        },
        error => {
          this.errorAlBuscarCodigo=true;
          this.planBuscada = null;
          this.codigoNoExiste = true;
        }
      );
    }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanesEntrenamiento>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
  seleccionarPlan(planesEntrenamiento: string) {
    this.planSeleccionado = planesEntrenamiento;
    this.seleccionOpcion=true;

  }
  detallesPlanes(planesEntrenamiento:string){
    this.editForm.controls["descripcion"].setValue(this.detallesPlan[planesEntrenamiento])
   
  }
  mostrarDetalles(planesEntrenamiento:string){
    this.descripcionPlan=this.detallesPlan[planesEntrenamiento];

  }
  detallesInstrucciones(planesEntrenamiento:string){
    this.editForm.controls["instrucciones"].setValue(this.instruccionesPlan[planesEntrenamiento])
   
  }
  mostrarDetallesIntrucciones(planesEntrenamiento:string){
    this.descripcionInstruccion=this.instruccionesPlan[planesEntrenamiento];

  }
 
  


  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(planesEntrenamiento: IPlanesEntrenamiento): void {
    this.planesEntrenamiento = planesEntrenamiento;
    this.planesEntrenamientoFormService.resetForm(this.editForm, planesEntrenamiento);
  }
}
