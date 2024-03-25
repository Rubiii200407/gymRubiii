
export interface IPlanesNutricion {
  id: number;
  nombrePlan?: string | null;
  descripcion?: string | null;
  instrucciones?: string | null;
  alimentosRecomendados?:string|null;
}

export type NewPlanesNutricion = Omit<IPlanesNutricion, 'id'> & { id: null };
