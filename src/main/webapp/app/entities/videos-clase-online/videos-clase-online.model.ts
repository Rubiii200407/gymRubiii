import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';

export interface IVideosClaseOnline {
  id: number;
  tituloVideo?: string | null;
  descripcionVideo?: string | null;
  urlVideo?: string | null;
  duracion?: number | null;
  claseOnline?: Pick<IClasesOnline, 'id'> | null;
}

export type NewVideosClaseOnline = Omit<IVideosClaseOnline, 'id'> & { id: null };
