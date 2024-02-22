import { IDeportes, NewDeportes } from './deportes.model';

export const sampleWithRequiredData: IDeportes = {
  id: 32743,
};

export const sampleWithPartialData: IDeportes = {
  id: 81366,
  nombreDeporte: 'communities networks',
  horariosDisponibles: 'user-centric systems',
  participantesInscritos: 'Canarias',
};

export const sampleWithFullData: IDeportes = {
  id: 99175,
  nombreDeporte: 'driver',
  descripcion: 'Acero COM Loan',
  horariosDisponibles: 'compress fritas Mancha',
  participantesInscritos: 'withdrawal',
};

export const sampleWithNewData: NewDeportes = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
