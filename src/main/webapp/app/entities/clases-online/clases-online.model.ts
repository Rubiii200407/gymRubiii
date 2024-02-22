export interface IClasesOnline {
  id: number;
  nombreClase?: string | null;
  descripcion?: string | null;
  horario?: string | null;
  instructor?: string | null;
  capacidad?: string | null;
  participantesInscritos?: string | null;
}

export type NewClasesOnline = Omit<IClasesOnline, 'id'> & { id: null };
