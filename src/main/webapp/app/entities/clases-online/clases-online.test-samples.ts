import { IClasesOnline, NewClasesOnline } from './clases-online.model';

export const sampleWithRequiredData: IClasesOnline = {
  id: 17747,
};

export const sampleWithPartialData: IClasesOnline = {
  id: 11132,
  horario: 'Programa',
};

export const sampleWithFullData: IClasesOnline = {
  id: 97940,
  nombreClase: 'embrace',
  descripcion: 'compress',
  horario: 'Granito solid proyección',
  instructor: 'Rústico Puerta Zapatos',
  capacidad: 'Guinea wireless',
  participantesInscritos: 'Parcela copy bluetooth',
};

export const sampleWithNewData: NewClasesOnline = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
