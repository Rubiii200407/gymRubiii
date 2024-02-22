export interface IDeportes {
  id: number;
  nombreDeporte?: string | null;
  descripcion?: string | null;
  horariosDisponibles?: string | null;
  participantesInscritos?: string | null;
}

export type NewDeportes = Omit<IDeportes, 'id'> & { id: null };
