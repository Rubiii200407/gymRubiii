import dayjs from 'dayjs/esm';
import { IClasesOnline } from 'app/entities/clases-online/clases-online.model';
import { IDeportes } from 'app/entities/deportes/deportes.model';

export interface IIncripciones {
  id: number;
  nombreUsuario?: string | null;
  tipoEvento?: string | null;
  nombreEvento?: string | null;
  fechaInscripcion?: dayjs.Dayjs | null;
  claseOnline?: Pick<IClasesOnline, 'id'> | null;
  deporte?: Pick<IDeportes, 'id'> | null;
}

export type NewIncripciones = Omit<IIncripciones, 'id'> & { id: null };
