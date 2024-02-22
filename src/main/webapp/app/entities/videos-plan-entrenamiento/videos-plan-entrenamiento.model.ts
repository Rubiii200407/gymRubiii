import dayjs from 'dayjs/esm';
import { IPlanesEntrenamiento } from 'app/entities/planes-entrenamiento/planes-entrenamiento.model';

export interface IVideosPlanEntrenamiento {
  id: number;
  tituloVideo?: string | null;
  descripcionVideo?: string | null;
  urlVideo?: string | null;
  duracion?: number | null;
  fechaPublicacion?: dayjs.Dayjs | null;
  planEntrenamiento?: Pick<IPlanesEntrenamiento, 'id'> | null;
}

export type NewVideosPlanEntrenamiento = Omit<IVideosPlanEntrenamiento, 'id'> & { id: null };
