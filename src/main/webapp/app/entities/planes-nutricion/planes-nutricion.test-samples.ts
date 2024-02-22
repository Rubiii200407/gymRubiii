import { IPlanesNutricion, NewPlanesNutricion } from './planes-nutricion.model';

export const sampleWithRequiredData: IPlanesNutricion = {
  id: 37069,
};

export const sampleWithPartialData: IPlanesNutricion = {
  id: 16358,
  tipo: 'Masía SCSI',
};

export const sampleWithFullData: IPlanesNutricion = {
  id: 44139,
  nombrePlan: 'program paradigma',
  descripcion: 'Account',
  tipo: 'proactive Auto',
  duracion: 84692,
  instrucciones: 'Argentine e-enable sticky',
};

export const sampleWithNewData: NewPlanesNutricion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
