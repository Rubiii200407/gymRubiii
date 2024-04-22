import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FormBuilder, FormControl } from '@angular/forms';
import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';
import { DeportesFormGroup, DeportesFormService } from './deportes-form.service';

@Component({
  selector: 'jhi-deportes-update',
  templateUrl: './deportes-update.component.html',
  styleUrls: ['./deportes-update.component.css'],
})
export class DeportesUpdateComponent implements OnInit {
  isSaving = false
  deportes: IDeportes | null = null;
  deporteSeleccionado?:string|null;
  horasDisponibles: string[] = [];
  horaDeporte: string = "";
  codigo?: string;
  nuevaConsulta=true;
  fechaDeporteControl = new FormControl('');
  uuid?:string
  guardado=false;
  seleccionOpcion:boolean=false;
  instructor?:string|null;
  codigoNoExiste = false;
  ahora:Date=new Date();
  fechaSeleccionada!:Date;
  codigoBusqueda = '';
  deporteBuscada: IDeportes | null = null;
  editForm: DeportesFormGroup = this.deportesFormService.createDeportesFormGroup();
  detallesDeportes:Record<string,string>= {
    "Tenis": "El tenis es un deporte que se practica con raquetas y una pequeña pelota. Pueden jugarlo dos individuos (uno contra uno) o dos parejas (dos personas contra las otras dos). El objetivo es impactar la pelota para que pase por encima de la red que divide la cancha a la mitad, intentando que el rival no consiga devolverla",
    "Padel": "El padel es un deporte de raqueta muy similar al tenis, pero que se juega en una pista más corta y dotada de paredes en los laterales y al fondo. El propósito del juego es hacer rebotar la pelota en el campo del oponente, golpeándola con una raqueta de madera llamada pala.",
    "Baloncesto":"El baloncesto consiste en introducir un balón, que dará punto, en un aro ubicado a 3 metros de altura. El balón puede ser golpeado en cualquier dirección con una o ambas manos, pero nunca con el puño. Un jugador no puede correr con el balón. El jugador debe lanzarlo desde el lugar donde lo toma.",
    "Zumba":" Zumba,es un programa de ejercicio que se inspira en movimientos y pasos de los bailes latinos.",
    "Spinning": "El spinning es una actividad física generalmente “indoor” que se realiza sobre una bicicleta fija y que cuenta con la presencia de un instructor o monitor encargado de marcar las intensidades y cadencias de la sesión.",
    "Crosfit":"El crosfit es una técnica de entrenamiento que conecta movimientos de diferentes disciplinas, tales como la halterofilia, el entrenamiento metabólico o el gimnástico. Consiste en acometer un programa de ejercicios (flexiones, tracción, etc), en un tiempo determinado y con un número definido de veces.",
  };
  instructorDeporte:Record<string,string>= {
    "Tenis": "Ruben",
    "Padel": "Julio",
    "Baloncesto":"Miriam",
    "Spinning":"Yeray",
    "Crosfit": "Inmaculada",
    "Zumba":"Ruben",
  };
  horariosPorDiaYDeporte: Record<string, Record<string, string[]>> = {
    'Monday': {
      'Tenis': ['08:00 AM', '10:00 AM', '14:00 PM'],
      'Baloncesto': ['09:00 AM', '11:00 AM', '15:00 PM'],
      'Crosfit': ['10:00 AM', '12:00 AM', '17:00 PM'],
      'Spinning': ['11:00 AM', '12:00 AM', '19:00 PM'],
      'Zumba': ['08:30 AM', '9:30 AM', '18:00 PM'],
      'Padel': ['09:30 AM', '11:30 AM', '20:00 PM'],
      
    },
    'Tuesday': {
      'Tenis': ['09:00 AM', '11:00 AM', '15:00 PM'],
      'Baloncesto': ['10:00 AM', '12:00 PM', '16:00 PM'],
      'Crosfit': ['11:00 AM', '14:00 AM', '18:00 PM'],
      'Spinning': ['09:30 AM', '10:00 AM', '17:00 PM'],
      'Zumba': ['08:00 AM', '10:00 AM', '19:00 PM'],
      'Padel': ['12:00 AM', '15:00 AM', '20:00 PM'],
    },
    'Wednesday': {
      'Tenis': ['10:00 AM', '12:00 PM', '16:00 PM'],
      'Baloncesto': ['11:00 AM', '13:00 PM', '17:00 PM'],
      'Crosfit': ['08:30 AM', '10:00 AM', '19:00 PM'],
      'Spinning': ['10:00 AM', '11:30 AM', '20:00 PM'],
      'Zumba': ['08:00 AM', '10:30 AM', '20:00 PM'],
      'Padel': ['09:30 AM', '11:00 AM', '21:00 PM'],
    },
    'Thursday': {
      'Tenis': ['11:00 AM', '17:00 PM', '20:00 PM'],
      'Baloncesto': ['12:00 PM', '14:00 PM', '18:00 PM'],
      'Crosfit': ['08:00 AM', '11:00 AM', '16:00 PM'],
      'Spinning': ['09:00 AM', '11:00 AM', '15:00 PM'],
      'Zumba': ['08:30 AM', '10:30 AM', '14:00 PM'],
      'Padel': ['09:30 AM', '11:30 AM', '19:00 PM'],
    },
    'Friday': {
      'Tenis': ['12:00 PM', '14:00 PM', '18:00 PM'],
      'Baloncesto': ['13:00 PM', '15:30 PM', '19:00 PM'],
      'Crosfit': ['08:30 AM', '11:00 AM', '17:00 PM'],
      'Spinning': ['09:00 AM', '12:00 AM', '16:00 PM'],
      'Zumba': ['08:00 AM', '10:30 AM', '20:00 PM'],
      'Padel': ['09:30 AM', '11:30 AM', '21:00 PM'],
    },
    'Saturday': {
      'Tenis': ['10:00 PM', '14:00 PM', '18:00 PM'],
      'Baloncesto': ['9:00 PM', '15:30 PM', '19:00 PM'],
      'Crosfit': ['08:30 AM', '11:00 AM', '17:00 PM'],
      'Spinning': ['09:30 AM', '12:00 AM', '16:00 PM'],
      'Zumba': ['10:30 AM', '14:30 AM', '20:00 PM'],
      'Padel': ['11:30 AM', '11:30 AM', '18:00 PM'],
    },
    'Sunday': {
      'Tenis': ['12:00 PM', '14:00 PM'],
      'Baloncesto': ['10:00 PM'],
      'Crosfit': ['08:30 AM', '13:00 AM'],
      'Spinning': ['11:00 AM',],
      'Zumba': ['08:00 AM', '10:30 AM', ],
      'Padel': ['09:30 AM', '11:30 AM'],
    },
  
  };
  descripcionDeporte :string=""

  instructorSeleccionado :string=""

  constructor(
    protected deportesService: DeportesService,
    protected deportesFormService: DeportesFormService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {

  }

  

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deportes }) => {
      this.deportes = deportes;
      if (deportes) {
        this.updateForm(deportes);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.guardado = true;
    this.isSaving = true;
    const deportes = this.deportesFormService.getDeportes(this.editForm);
  
    if (deportes.id !== null) {
      this.subscribeToSaveResponse(this.deportesService.update(deportes));
    } else {
      this.deportesService.create(deportes).subscribe(
        (deporte) => {
          this.codigo = deporte.body?.codigo ?? '';
          this.descargarCodigo(this.codigo);
        },
      );
    }
 
}
pantallaCreacionDeportes(): void {
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
    this.deportesService.findUUID(this.codigoBusqueda).subscribe(
      deporte => {
        if (deporte !== null) {
          this.deporteBuscada = deporte.body;
          this.codigoNoExiste = false;
        } else {
          this.deporteBuscada = null;
          this.codigoNoExiste = true;
        }
      },
      error => {
        this.deporteBuscada = null;
        this.codigoNoExiste = true;
      }
    );
  }

  
  

  instructorElejir(clasesOnline: string) {
    this.instructorSeleccionado = clasesOnline;
    if(this.instructor){
    this.instructorSeleccionado=this.instructor;
    }
  }
  seleccionarDeporte(deporte: string) {
    this.deporteSeleccionado = deporte;
    this.seleccionOpcion=true;
    this.actualizarHorasDisponibles();
  }
  detallesDeporte(deportes:string){
    this.editForm.controls["descripcion"].setValue(this.detallesDeportes[deportes])
  }
  mostrarDetalles(deportes:string){
    this.descripcionDeporte=this.detallesDeportes[deportes];

  }
  mostrarInstructor(clasesOnline:string){
    this.instructorSeleccionado=this.instructorDeporte[clasesOnline];

  }
  seleccionarHora(hora: string) {
    this.editForm.get('horaDeporte')?.setValue(hora);
  }
 
  actualizarHorasDisponibles(): void {
    const fechaSeleccionadaStr: Date | null = this.editForm.get('fechaDeporte')?.value || null;
    const fechaSeleccionada: Date | null = fechaSeleccionadaStr ? new Date(fechaSeleccionadaStr) : null;
  
    if(fechaSeleccionadaStr){
      this.fechaSeleccionada=new Date(fechaSeleccionadaStr);
    }
    if (fechaSeleccionada) {
      const diaSeleccionado = this.obtenerDiaSemana(fechaSeleccionada);
  
      if (diaSeleccionado && this.horariosPorDiaYDeporte[diaSeleccionado]) {
        const horasDeporte = this.horariosPorDiaYDeporte[diaSeleccionado][this.deporteSeleccionado || ''];
  
        if (horasDeporte) {
          this.horasDisponibles = horasDeporte;
          console.log('Horas disponibles:', this.horasDisponibles);
        } else {
          this.horasDisponibles = [];
        }
      } else {
        this.horasDisponibles = [];
      }
    } else {
      this.horasDisponibles = [];
    }
  }
  minFecha():string{
    const today=new Date();
    const year=today.getFullYear();
    let month:string|number = today.getMonth()+1;
    let day:string|number=today.getDate();
    if(month<10){
      month="0"+month;
    }
    if(day<10){
      day="0" +day;
    }
    return `${year}-${month}-${day}`;
  }

  getHorasDisponibles(fechaSeleccionada:Date):string[]{
    const ahora=new Date();
    const horaActual=ahora.getHours();
    const minutosActual=ahora.getMinutes();

    if(!this.fechaHoy(fechaSeleccionada)){
      return this.horasDisponibles;
    }else{
      const horasFiltradas=this.horasDisponibles.filter(hora=>{
        const[horaStr,minutoStr]=hora.split(":");
        const horaDisponible=parseInt(horaStr,10);
        const minutoDisponible=parseInt(minutoStr,10);
        return horaDisponible>=horaActual||(horaDisponible===horaActual&&minutoDisponible>=minutosActual);
      });
      return horasFiltradas;
    
    }
  }

  private fechaHoy(fecha:Date):boolean{
    const ahora=new Date();
    return fecha.getFullYear()===ahora.getFullYear()&&fecha.getMonth()===ahora.getMonth()&&fecha.getDate()===ahora.getDate();
  }
  
  

  obtenerDiaSemana(fecha: Date | null | undefined): string | null {
    if (!fecha || !(fecha instanceof Date)) {
      return null;
    }
  
    const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return diasSemana[fecha.getDay()];
  } 

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeportes>>): void {
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

  protected updateForm(deportes: IDeportes): void {
    this.deportes = deportes;
    this.deportesFormService.resetForm(this.editForm, deportes);
  }
}
