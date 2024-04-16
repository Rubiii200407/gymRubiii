import dayjs from 'dayjs/esm';
import { IClasesOnline } from '../clases-online/clases-online.model';
import { IDeportes } from '../deportes/deportes.model';
import { IFichero } from '../fichero/fichero.model';
import { IPlanesEntrenamiento } from '../planes-entrenamiento/planes-entrenamiento.model';
import { IPlanesNutricion } from '../planes-nutricion/planes-nutricion.model';



export interface IComentario {
  id: number;
  descripcion?: string | null;
  fechaCreacion?: dayjs.Dayjs | null;
  creador?: string | null;
  deportes?: Pick<IDeportes, 'id'> | null;
  clasesOnline?: Pick<IClasesOnline, 'id'> | null;
  planesNutricion?: Pick<IPlanesNutricion, 'id'> | null;
  planesEntrenamiento?: Pick<IPlanesEntrenamiento, 'id'> | null;
  ficheros?: IFichero[] | null;

}

export type NewComentario = Omit<IComentario, 'id'> & { id: null };
