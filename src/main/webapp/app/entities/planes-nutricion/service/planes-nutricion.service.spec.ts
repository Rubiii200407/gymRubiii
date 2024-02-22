import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPlanesNutricion } from '../planes-nutricion.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../planes-nutricion.test-samples';

import { PlanesNutricionService } from './planes-nutricion.service';

const requireRestSample: IPlanesNutricion = {
  ...sampleWithRequiredData,
};

describe('PlanesNutricion Service', () => {
  let service: PlanesNutricionService;
  let httpMock: HttpTestingController;
  let expectedResult: IPlanesNutricion | IPlanesNutricion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PlanesNutricionService);
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

    it('should create a PlanesNutricion', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const planesNutricion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(planesNutricion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PlanesNutricion', () => {
      const planesNutricion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(planesNutricion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PlanesNutricion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PlanesNutricion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PlanesNutricion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPlanesNutricionToCollectionIfMissing', () => {
      it('should add a PlanesNutricion to an empty array', () => {
        const planesNutricion: IPlanesNutricion = sampleWithRequiredData;
        expectedResult = service.addPlanesNutricionToCollectionIfMissing([], planesNutricion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesNutricion);
      });

      it('should not add a PlanesNutricion to an array that contains it', () => {
        const planesNutricion: IPlanesNutricion = sampleWithRequiredData;
        const planesNutricionCollection: IPlanesNutricion[] = [
          {
            ...planesNutricion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPlanesNutricionToCollectionIfMissing(planesNutricionCollection, planesNutricion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PlanesNutricion to an array that doesn't contain it", () => {
        const planesNutricion: IPlanesNutricion = sampleWithRequiredData;
        const planesNutricionCollection: IPlanesNutricion[] = [sampleWithPartialData];
        expectedResult = service.addPlanesNutricionToCollectionIfMissing(planesNutricionCollection, planesNutricion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesNutricion);
      });

      it('should add only unique PlanesNutricion to an array', () => {
        const planesNutricionArray: IPlanesNutricion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const planesNutricionCollection: IPlanesNutricion[] = [sampleWithRequiredData];
        expectedResult = service.addPlanesNutricionToCollectionIfMissing(planesNutricionCollection, ...planesNutricionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const planesNutricion: IPlanesNutricion = sampleWithRequiredData;
        const planesNutricion2: IPlanesNutricion = sampleWithPartialData;
        expectedResult = service.addPlanesNutricionToCollectionIfMissing([], planesNutricion, planesNutricion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(planesNutricion);
        expect(expectedResult).toContain(planesNutricion2);
      });

      it('should accept null and undefined values', () => {
        const planesNutricion: IPlanesNutricion = sampleWithRequiredData;
        expectedResult = service.addPlanesNutricionToCollectionIfMissing([], null, planesNutricion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(planesNutricion);
      });

      it('should return initial array if no PlanesNutricion is added', () => {
        const planesNutricionCollection: IPlanesNutricion[] = [sampleWithRequiredData];
        expectedResult = service.addPlanesNutricionToCollectionIfMissing(planesNutricionCollection, undefined, null);
        expect(expectedResult).toEqual(planesNutricionCollection);
      });
    });

    describe('comparePlanesNutricion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePlanesNutricion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePlanesNutricion(entity1, entity2);
        const compareResult2 = service.comparePlanesNutricion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePlanesNutricion(entity1, entity2);
        const compareResult2 = service.comparePlanesNutricion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePlanesNutricion(entity1, entity2);
        const compareResult2 = service.comparePlanesNutricion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
