import { INutricion, NewNutricion } from './nutricion.model';

export const sampleWithRequiredData: INutricion = {
  id: 51574,
};

export const sampleWithPartialData: INutricion = {
  id: 34466,
  nombrePlanNutricion: 'AGP front-end',
  instrucciones: 'Account withdrawal',
};

export const sampleWithFullData: INutricion = {
  id: 47031,
  nombrePlanNutricion: 'end-to-end',
  descripcion: 'multi-byte Salud bus',
  tipoDieta: 'Cuesta calculating e-business',
  alimentosRecomendados: 'Visionario Coche parsing',
  instrucciones: 'Gerente Armenia',
};

export const sampleWithNewData: NewNutricion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
