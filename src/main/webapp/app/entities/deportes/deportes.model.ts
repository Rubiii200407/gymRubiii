
export interface IDeportes {
  id: number;
  nombreDeporte?: string | null;
  descripcion?: string | null;
  fechaDeporte?: Date | null;
  horaDeporte?: string| null;
  codigo?: string | null;
  instructor?:string|null;

}

export type NewDeportes = Omit<IDeportes, 'id'> & { id: null };
