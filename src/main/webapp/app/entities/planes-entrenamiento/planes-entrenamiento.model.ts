import { IUser } from "../user/user.model";

export interface IPlanesEntrenamiento {
  id: number;
  nombrePlan?: string | null;
  descripcion?: string | null;
  instrucciones?: string | null;
  codigo?:string|null
  videoId?:string|null
  user?: Pick<IUser, 'id'> | null;
}

export type NewPlanesEntrenamiento = Omit<IPlanesEntrenamiento, 'id'> & { id: null };
