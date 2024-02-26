import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FormBuilder } from '@angular/forms';
import { IDeportes } from '../deportes.model';
import { DeportesService } from '../service/deportes.service';
import { DeportesFormGroup, DeportesFormService } from './deportes-form.service';

@Component({
  selector: 'jhi-deportes-update',
  templateUrl: './deportes-update.component.html',
  styleUrls: ['./deportes-update.component.css'],
})
export class DeportesUpdateComponent implements OnInit {
  isSaving = false;
  turno?: string | null;
  mañana?: string | null;
  tarde?: string | null;
  deportes: IDeportes | null = null;
  deporteSeleccionado?:string|null;
  fechaYHoraSeleccionada: string | null = null;
  fechaSeleccionada?: string | null = null;
  horaSeleccionada: string | null = null;
  horasDisponibles: string[] = [];
  editForm: DeportesFormGroup = this.deportesFormService.createDeportesFormGroup();
  detallesDeportes:Record<string,string>= {
    "Tenis": "El tenis es un deporte que se practica con raquetas y una pequeña pelota. Pueden jugarlo dos individuos (uno contra uno) o dos parejas (dos personas contra las otras dos). El objetivo es impactar la pelota para que pase por encima de la red que divide la cancha a la mitad, intentando que el rival no consiga devolverla",
    "Padel": "El padel es un deporte de raqueta muy similar al tenis, pero que se juega en una pista más corta y dotada de paredes en los laterales y al fondo. El propósito del juego es hacer rebotar la pelota en el campo del oponente, golpeándola con una raqueta de madera llamada pala.",
    "Baloncesto":"El baloncesto consiste en introducir un balón, que dará punto, en un aro ubicado a 3 metros de altura. El balón puede ser golpeado en cualquier dirección con una o ambas manos, pero nunca con el puño. Un jugador no puede correr con el balón. El jugador debe lanzarlo desde el lugar donde lo toma.",
    "Zumba":" Zumba,es un programa de ejercicio que se inspira en movimientos y pasos de los bailes latinos.",
    "Spinning": "El spinning es una actividad física generalmente “indoor” que se realiza sobre una bicicleta fija y que cuenta con la presencia de un instructor o monitor encargado de marcar las intensidades y cadencias de la sesión.",
    "Crosfit":"El crosfit es una técnica de entrenamiento que conecta movimientos de diferentes disciplinas, tales como la halterofilia, el entrenamiento metabólico o el gimnástico. Consiste en acometer un programa de ejercicios (flexiones, tracción, etc), en un tiempo determinado y con un número definido de veces.",
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
  
  };
  descripcionDeporte :string=""



  constructor(
    protected deportesService: DeportesService,
    protected deportesFormService: DeportesFormService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
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
    this.isSaving = true;
    const deportes = this.deportesFormService.getDeportes(this.editForm);
    if (deportes.id !== null) {
      this.subscribeToSaveResponse(this.deportesService.update(deportes));
    } else {
      this.subscribeToSaveResponse(this.deportesService.create(deportes));
    }
  }
 
  seleccionarDeporte(deporte: string) {
    this.deporteSeleccionado = deporte;
    this.actualizarHorasDisponibles();
  }
  detallesDeporte(deportes:string){
    this.editForm.controls["descripcion"].setValue(this.detallesDeportes[deportes])
  }
  mostrarDetalles(deportes:string){
    this.descripcionDeporte=this.detallesDeportes[deportes];

  }
  actualizarHorasDisponibles() {
    const horariosDisponiblesControl = this.editForm.controls['horariosDisponibles'];
    
    if (horariosDisponiblesControl.value) {
      const diaSeleccionado = this.obtenerDiaSemana(horariosDisponiblesControl.value);
      
      if (diaSeleccionado && this.horariosPorDiaYDeporte[diaSeleccionado]) {
        const horasDeporte = this.horariosPorDiaYDeporte[diaSeleccionado][this.deporteSeleccionado || ""];
        
        if (horasDeporte) {
          this.horasDisponibles = horasDeporte;
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
  
  
  seleccionarHora(hora: string) {
    this.horaSeleccionada = hora;
    const horariosDisponiblesControl = this.editForm.controls['horariosDisponibles'];
  
    if (this.horaSeleccionada && horariosDisponiblesControl.valid) {
      const fechaSeleccionada = horariosDisponiblesControl.value;
      this.fechaYHoraSeleccionada = fechaSeleccionada + ' ' + this.horaSeleccionada;
      horariosDisponiblesControl.setValue(this.fechaYHoraSeleccionada);
    }
  }
  
  
  obtenerDiaSemana(fecha: string): string | null {
    if (!fecha) {
      return null;
    }
  
    const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fechaObj = new Date(fecha);
    return diasSemana[fechaObj.getDay()];
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
