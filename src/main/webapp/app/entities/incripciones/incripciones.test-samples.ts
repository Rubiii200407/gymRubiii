import dayjs from 'dayjs/esm';

import { IIncripciones, NewIncripciones } from './incripciones.model';

export const sampleWithRequiredData: IIncripciones = {
  id: 60643,
};

export const sampleWithPartialData: IIncripciones = {
  id: 87243,
  tipoEvento: 'proactive best-of-breed',
  nombreEvento: 'Director withdrawal',
  fechaInscripcion: dayjs('2024-02-22T08:45'),
};

export const sampleWithFullData: IIncripciones = {
  id: 62530,
  nombreUsuario: 'a Acero mediante',
  tipoEvento: 'Inversor Optimización',
  nombreEvento: 'payment Mali',
  fechaInscripcion: dayjs('2024-02-21T15:45'),
};

export const sampleWithNewData: NewIncripciones = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
