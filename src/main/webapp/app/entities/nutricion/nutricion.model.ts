export interface INutricion {
  id: number;
  nombrePlanNutricion?: string | null;
  descripcion?: string | null;
  tipoDieta?: string | null;
  alimentosRecomendados?: string | null;
  instrucciones?: string | null;
}

export type NewNutricion = Omit<INutricion, 'id'> & { id: null };
