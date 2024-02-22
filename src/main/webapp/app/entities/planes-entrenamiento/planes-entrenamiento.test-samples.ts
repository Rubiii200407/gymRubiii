import { IPlanesEntrenamiento, NewPlanesEntrenamiento } from './planes-entrenamiento.model';

export const sampleWithRequiredData: IPlanesEntrenamiento = {
  id: 56913,
};

export const sampleWithPartialData: IPlanesEntrenamiento = {
  id: 81158,
  nombrePlan: 'Oficial mesh',
  descripcion: 'intranet Urbanización XML',
  tipo: 'Relacciones',
};

export const sampleWithFullData: IPlanesEntrenamiento = {
  id: 21201,
  nombrePlan: 'Mascotas Plástico',
  descripcion: 'Vía e-markets Dinánmico',
  tipo: 'León Cambridgeshire Verde',
  duracion: 24348,
  instrucciones: 'Negro',
};

export const sampleWithNewData: NewPlanesEntrenamiento = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
