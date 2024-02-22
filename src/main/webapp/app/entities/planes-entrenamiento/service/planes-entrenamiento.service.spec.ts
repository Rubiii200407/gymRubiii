import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlanesEntrenamiento } from '../planes-entrenamiento.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../planes-entrenamiento.test-samples';

import { PlanesEntrenamientoService } from './planes-entrenamiento.service';

const requireRestSample: IPlanesEntrenamiento = {
  ...sampleWithRequiredData,
};

describe('PlanesEntrenamiento Service', () => {
  let service: PlanesEntrenamientoService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlanesEntrenamiento | IPlanesEntrenamiento[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlanesEntrenamientoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a PlanesEntrenamiento', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const planesEntrenamiento = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(planesEntrenamiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PlanesEntrenamiento', () => {
      const planesEntrenamiento = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(planesEntrenamiento).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PlanesEntrenamiento', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PlanesEntrenamiento', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PlanesEntrenamiento', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlanesEntrenamientoToCollectionIfMissing', () => {
      it('should add a PlanesEntrenamiento to an empty array', () => {
        const planesEntrenamiento: IPlanesEntrenamiento = sampleWithRequiredData;
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing([], planesEntrenamiento);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesEntrenamiento);
      });

      it('should not add a PlanesEntrenamiento to an array that contains it', () => {
        const planesEntrenamiento: IPlanesEntrenamiento = sampleWithRequiredData;
        const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [
          {
            ...planesEntrenamiento,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing(planesEntrenamientoCollection, planesEntrenamiento);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PlanesEntrenamiento to an array that doesn't contain it", () => {
        const planesEntrenamiento: IPlanesEntrenamiento = sampleWithRequiredData;
        const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [sampleWithPartialData];
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing(planesEntrenamientoCollection, planesEntrenamiento);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesEntrenamiento);
      });

      it('should add only unique PlanesEntrenamiento to an array', () => {
        const planesEntrenamientoArray: IPlanesEntrenamiento[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [sampleWithRequiredData];
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing(planesEntrenamientoCollection, ...planesEntrenamientoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planesEntrenamiento: IPlanesEntrenamiento = sampleWithRequiredData;
        const planesEntrenamiento2: IPlanesEntrenamiento = sampleWithPartialData;
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing([], planesEntrenamiento, planesEntrenamiento2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesEntrenamiento);
        expect(expectedResult).toContain(planesEntrenamiento2);
      });

      it('should accept null and undefined values', () => {
        const planesEntrenamiento: IPlanesEntrenamiento = sampleWithRequiredData;
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing([], null, planesEntrenamiento, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesEntrenamiento);
      });

      it('should return initial array if no PlanesEntrenamiento is added', () => {
        const planesEntrenamientoCollection: IPlanesEntrenamiento[] = [sampleWithRequiredData];
        expectedResult = service.addPlanesEntrenamientoToCollectionIfMissing(planesEntrenamientoCollection, undefined, null);
        expect(expectedResult).toEqual(planesEntrenamientoCollection);
      });
    });

    describe('comparePlanesEntrenamiento', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlanesEntrenamiento(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePlanesEntrenamiento(entity1, entity2);
        const compareResult2 = service.comparePlanesEntrenamiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePlanesEntrenamiento(entity1, entity2);
        const compareResult2 = service.comparePlanesEntrenamiento(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePlanesEntrenamiento(entity1, entity2);
        const compareResult2 = service.comparePlanesEntrenamiento(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
