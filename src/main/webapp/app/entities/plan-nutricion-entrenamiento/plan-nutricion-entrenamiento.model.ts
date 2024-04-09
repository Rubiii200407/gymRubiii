
export interface IPlanNutricionEntrenamiento {
    id: number;
    nombrePlan?: string | null;
    instrucciones?: string | null;
    video?: string | null;
  }
  
  export type NewPlanNutricionEntrenamiento = Omit<IPlanNutricionEntrenamiento, 'id'> & { id: null };
  