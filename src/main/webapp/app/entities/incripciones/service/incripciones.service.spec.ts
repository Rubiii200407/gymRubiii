import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIncripciones } from '../incripciones.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../incripciones.test-samples';

import { IncripcionesService, RestIncripciones } from './incripciones.service';

const requireRestSample: RestIncripciones = {
  ...sampleWithRequiredData,
  fechaInscripcion: sampleWithRequiredData.fechaInscripcion?.toJSON(),
};

describe('Incripciones Service', () => {
  let service: IncripcionesService;
  let httpMock: HttpTestingController;
  let expectedResult: IIncripciones | IIncripciones[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IncripcionesService);
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

    it('should create a Incripciones', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const incripciones = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(incripciones).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Incripciones', () => {
      const incripciones = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(incripciones).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Incripciones', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Incripciones', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Incripciones', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addIncripcionesToCollectionIfMissing', () => {
      it('should add a Incripciones to an empty array', () => {
        const incripciones: IIncripciones = sampleWithRequiredData;
        expectedResult = service.addIncripcionesToCollectionIfMissing([], incripciones);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(incripciones);
      });

      it('should not add a Incripciones to an array that contains it', () => {
        const incripciones: IIncripciones = sampleWithRequiredData;
        const incripcionesCollection: IIncripciones[] = [
          {
            ...incripciones,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addIncripcionesToCollectionIfMissing(incripcionesCollection, incripciones);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Incripciones to an array that doesn't contain it", () => {
        const incripciones: IIncripciones = sampleWithRequiredData;
        const incripcionesCollection: IIncripciones[] = [sampleWithPartialData];
        expectedResult = service.addIncripcionesToCollectionIfMissing(incripcionesCollection, incripciones);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(incripciones);
      });

      it('should add only unique Incripciones to an array', () => {
        const incripcionesArray: IIncripciones[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const incripcionesCollection: IIncripciones[] = [sampleWithRequiredData];
        expectedResult = service.addIncripcionesToCollectionIfMissing(incripcionesCollection, ...incripcionesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const incripciones: IIncripciones = sampleWithRequiredData;
        const incripciones2: IIncripciones = sampleWithPartialData;
        expectedResult = service.addIncripcionesToCollectionIfMissing([], incripciones, incripciones2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(incripciones);
        expect(expectedResult).toContain(incripciones2);
      });

      it('should accept null and undefined values', () => {
        const incripciones: IIncripciones = sampleWithRequiredData;
        expectedResult = service.addIncripcionesToCollectionIfMissing([], null, incripciones, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(incripciones);
      });

      it('should return initial array if no Incripciones is added', () => {
        const incripcionesCollection: IIncripciones[] = [sampleWithRequiredData];
        expectedResult = service.addIncripcionesToCollectionIfMissing(incripcionesCollection, undefined, null);
        expect(expectedResult).toEqual(incripcionesCollection);
      });
    });

    describe('compareIncripciones', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareIncripciones(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareIncripciones(entity1, entity2);
        const compareResult2 = service.compareIncripciones(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareIncripciones(entity1, entity2);
        const compareResult2 = service.compareIncripciones(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareIncripciones(entity1, entity2);
        const compareResult2 = service.compareIncripciones(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
