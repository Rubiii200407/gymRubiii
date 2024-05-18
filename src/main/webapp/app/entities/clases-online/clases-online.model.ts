import { IUser } from "../user/user.model";

export interface IClasesOnline {
  id: number;
  nombreClase?: string | null;
  descripcion?: string | null;
  fechaClase?: Date | null;
  instructor?: string | null;
  horaClase?: string | null;
  codigo?:string|null;
  videoId?:string|null;
  user?: Pick<IUser, 'id'> | null;

}

export type NewClasesOnline = Omit<IClasesOnline, 'id'> & { id: null };
