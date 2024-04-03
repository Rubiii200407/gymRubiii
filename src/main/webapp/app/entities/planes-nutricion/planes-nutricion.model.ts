import { IUser } from "../user/user.model";

export interface IPlanesNutricion {
  id: number;
  nombrePlan?: string | null;
  descripcion?: string | null;
  instrucciones?: string | null;
  alimentosRecomendados?:string|null;
  codigo?:string|null
  user?: Pick<IUser, 'id'> | null;
}

export type NewPlanesNutricion = Omit<IPlanesNutricion, 'id'> & { id: null };
