import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INutricion } from '../nutricion.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../nutricion.test-samples';

import { NutricionService } from './nutricion.service';

const requireRestSample: INutricion = {
  ...sampleWithRequiredData,
};

describe('Nutricion Service', () => {
  let service: NutricionService;
  let httpMock: HttpTestingController;
  let expectedResult: INutricion | INutricion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NutricionService);
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

    it('should create a Nutricion', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const nutricion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nutricion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Nutricion', () => {
      const nutricion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nutricion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Nutricion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Nutricion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Nutricion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNutricionToCollectionIfMissing', () => {
      it('should add a Nutricion to an empty array', () => {
        const nutricion: INutricion = sampleWithRequiredData;
        expectedResult = service.addNutricionToCollectionIfMissing([], nutricion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutricion);
      });

      it('should not add a Nutricion to an array that contains it', () => {
        const nutricion: INutricion = sampleWithRequiredData;
        const nutricionCollection: INutricion[] = [
          {
            ...nutricion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNutricionToCollectionIfMissing(nutricionCollection, nutricion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Nutricion to an array that doesn't contain it", () => {
        const nutricion: INutricion = sampleWithRequiredData;
        const nutricionCollection: INutricion[] = [sampleWithPartialData];
        expectedResult = service.addNutricionToCollectionIfMissing(nutricionCollection, nutricion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutricion);
      });

      it('should add only unique Nutricion to an array', () => {
        const nutricionArray: INutricion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nutricionCollection: INutricion[] = [sampleWithRequiredData];
        expectedResult = service.addNutricionToCollectionIfMissing(nutricionCollection, ...nutricionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nutricion: INutricion = sampleWithRequiredData;
        const nutricion2: INutricion = sampleWithPartialData;
        expectedResult = service.addNutricionToCollectionIfMissing([], nutricion, nutricion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nutricion);
        expect(expectedResult).toContain(nutricion2);
      });

      it('should accept null and undefined values', () => {
        const nutricion: INutricion = sampleWithRequiredData;
        expectedResult = service.addNutricionToCollectionIfMissing([], null, nutricion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nutricion);
      });

      it('should return initial array if no Nutricion is added', () => {
        const nutricionCollection: INutricion[] = [sampleWithRequiredData];
        expectedResult = service.addNutricionToCollectionIfMissing(nutricionCollection, undefined, null);
        expect(expectedResult).toEqual(nutricionCollection);
      });
    });

    describe('compareNutricion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNutricion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNutricion(entity1, entity2);
        const compareResult2 = service.compareNutricion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNutricion(entity1, entity2);
        const compareResult2 = service.compareNutricion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNutricion(entity1, entity2);
        const compareResult2 = service.compareNutricion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
