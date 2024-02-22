import dayjs from 'dayjs/esm';

import { IVideosPlanEntrenamiento, NewVideosPlanEntrenamiento } from './videos-plan-entrenamiento.model';

export const sampleWithRequiredData: IVideosPlanEntrenamiento = {
  id: 86099,
};

export const sampleWithPartialData: IVideosPlanEntrenamiento = {
  id: 68910,
  fechaPublicacion: dayjs('2024-02-21T23:56'),
};

export const sampleWithFullData: IVideosPlanEntrenamiento = {
  id: 91278,
  tituloVideo: 'Ergonómico overriding 1080p',
  descripcionVideo: 'sensor',
  urlVideo: 'Avon open-source',
  duracion: 27622,
  fechaPublicacion: dayjs('2024-02-22T00:55'),
};

export const sampleWithNewData: NewVideosPlanEntrenamiento = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
