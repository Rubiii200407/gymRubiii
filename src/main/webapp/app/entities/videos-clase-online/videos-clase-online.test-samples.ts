import { IVideosClaseOnline, NewVideosClaseOnline } from './videos-clase-online.model';

export const sampleWithRequiredData: IVideosClaseOnline = {
  id: 1189,
};

export const sampleWithPartialData: IVideosClaseOnline = {
  id: 14868,
  descripcionVideo: 'Valenciana',
  urlVideo: 'Guapa Buckinghamshire',
};

export const sampleWithFullData: IVideosClaseOnline = {
  id: 9847,
  tituloVideo: 'Andalucía index Estratega',
  descripcionVideo: 'Macao Interno Arquitecto',
  urlVideo: 'one-to-one',
  duracion: 98260,
};

export const sampleWithNewData: NewVideosClaseOnline = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
