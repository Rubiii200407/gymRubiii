import { INutricion } from 'app/entities/nutricion/nutricion.model';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';

export interface IPlanesNutricion {
  id: number;
  nombrePlan?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  duracion?: number | null;
  instrucciones?: string | null;
  planNutricion?: Pick<INutricion, 'id'> | null;
  planEntrenamiento?: Pick<IPlanesEntrenamiento, 'id'> | null;
}

export type NewPlanesNutricion = Omit<IPlanesNutricion, 'id'> & { id: null };
