import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IPlanesNutricion } from '../planes-nutricion.model';
import { PlanesNutricionService } from '../service/planes-nutricion.service';
import { PlanesNutricionFormGroup, PlanesNutricionFormService } from './planes-nutricion-form.service';


@Component({
  selector: 'jhi-planes-nutricion-update',
  templateUrl: './planes-nutricion-update.component.html',
})
export class PlanesNutricionUpdateComponent implements OnInit {
  isSaving = false;
  sexo?:string;
  alimentos?:string;
  instrucciones?:string;
  edad?:number;
  peso?:string;
  actividadFisica?:string;
  altura?:string;
  objetivo?:string
  calorias?:number;
  neat?:number;
  planesNutricion: IPlanesNutricion | null = null;
  planSeleccionado?:string|null;
  codigo?: string;
  nuevaConsulta = true;
  uuid?:string
  guardado=false;
  codigoNoExiste = false;
planBuscada: IPlanesNutricion | null = null;
  codigoBusqueda = '';
  editForm: PlanesNutricionFormGroup = this.planesNutricionFormService.createPlanesNutricionFormGroup();
  detallesPlan:Record<string,string>= {
    "PerderGrasa": "El entrenamiento funcional es una combinación de ejercicios centrados en el propio peso corporal y movimientos funcionales que mejoren la fuerza, la resistencia y la movilidad.",
    "Forma": "El yoga es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.",
    "GanarPeso":"El HIIT consiste en sesiones cortas e intensas que alternan entre ráfagas de ejercicios vigorosos y períodos de descanso, efectivas para quemar calorías y mejorar la condición física.",
    
  };
  instruccionesPlan:Record<string,string>= {
    "perdidapeso": "hols",
    "mantenimiento": "f",
    "ganarpeso":"r",
    
  };
    alimentosPlan:Record<string,string>= {
    "perdidapeso": "platano",
    "mantenimiento": "manzana",
    "ganarpeso":"pera",
    
  };
 
  descripcionPlan :string=""
  constructor(
    protected planesNutricionService: PlanesNutricionService,
    protected planesNutricionFormService: PlanesNutricionFormService,
    protected activatedRoute: ActivatedRoute,
     protected router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planesNutricion }) => {
      this.planesNutricion = planesNutricion;
      if (planesNutricion) {
        this.updateForm(planesNutricion);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.guardado = true;
    this.isSaving = true;
    const planesNutricion = this.planesNutricionFormService.getPlanesNutricion(this.editForm);
  
    if (planesNutricion.id !== null) {
      this.subscribeToSaveResponse(this.planesNutricionService.update(planesNutricion));
    } else {
      this.planesNutricionService.create(planesNutricion).subscribe(
        (plan) => {
          this.codigo = plan.body?.codigo ?? '';
          this.descargarCodigo(this.codigo);
        },
      );
    }
 
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
    this.planesNutricionService.findUUID(this.codigoBusqueda).subscribe(
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
        this.planBuscada = null;
        this.codigoNoExiste = true;
      }
    );
  }
  calcularCalorias(){

    if(!this.peso||!this.edad||!this.sexo||!this.altura||!this.actividadFisica||!this.planSeleccionado){
      return;
    }
    const pesoNumero=parseFloat(this.peso);
    const edadNumero=this.edad;
    const alturaNumero=parseFloat(this.altura);
    if(isNaN(pesoNumero) || isNaN(edadNumero)|| isNaN(alturaNumero)){
      return;
    }
    let tmb:number=0;
    if(this.sexo=="masculino"){
      tmb= (10 * pesoNumero) + (6.25 * alturaNumero) - (5 * edadNumero) + 5
    }else if(this.sexo=="femenino"){
      tmb= (10 * pesoNumero) + (6.25 * alturaNumero) - (5 * edadNumero) + 161

    }
    let factorActividad:number;
    switch(this.actividadFisica){
      case'1-2Dias':
      factorActividad=1.2;
      break;
      case'3-5Dias':
      factorActividad=1.375;
      break;
      case'6-7Dias':
      factorActividad=1.55;
      break;
      default:
      return;

    }
    switch(this.planSeleccionado){
      case'perdidapeso':
      this.calorias=(tmb* factorActividad) - 500;
      break;
      case'mantenimiento':
      this.calorias= tmb* factorActividad;
      break;
      case'ganarpeso':
      this.calorias=(tmb* factorActividad) + 500;
      break;
      default:
      return;
      
    }
  }
  Enlaces(ruta:string){
    switch(this.planSeleccionado){
      case 'perdidapeso':
      this.router.navigate(["clases-online/new"]);
      this.router.navigate(["deportes/new"]);
      this.router.navigate(["planes-entrenamiento/new"]);
      break;
      case 'mantenimiento':
      this.router.navigate(["clases-online/new"]);
      this.router.navigate(["deportes/new"]);
      this.router.navigate(["planes-entrenamiento/new"]);
      break;
      case 'ganarpeso':
      this.router.navigate(["planes-entrenamiento/new"]);
      break;

    }
    
  }

  seleccionarPlan(planesNutricion: string) {
    this.planSeleccionado = planesNutricion;

  }
  detallesPlanes(planesNutricion:string){
    this.editForm.controls["descripcion"].setValue(this.detallesPlan[planesNutricion])
   
  }
  mostrarDetalles(planesNutricion:string){
    this.descripcionPlan=this.detallesPlan[planesNutricion];


  }



  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanesNutricion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
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

  protected updateForm(planesNutricion: IPlanesNutricion): void {
    this.planesNutricion = planesNutricion;
    this.planesNutricionFormService.resetForm(this.editForm, planesNutricion);
  }
}
