import { IUser } from "../user/user.model";

export interface IDeportes {
  id: number;
  nombreDeporte?: string | null;
  descripcion?: string | null;
  fechaDeporte?: Date | null;
  horaDeporte?: string| null;
  codigo?: string | null;
  instructor?:string|null;
  user?: Pick<IUser, 'id'> | null;

}

export type NewDeportes = Omit<IDeportes, 'id'> & { id: null };
