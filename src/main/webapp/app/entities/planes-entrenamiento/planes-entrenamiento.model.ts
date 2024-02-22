export interface IPlanesEntrenamiento {
  id: number;
  nombrePlan?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  duracion?: number | null;
  instrucciones?: string | null;
}

export type NewPlanesEntrenamiento = Omit<IPlanesEntrenamiento, 'id'> & { id: null };
