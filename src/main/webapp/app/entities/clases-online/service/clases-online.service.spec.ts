import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClasesOnline } from '../clases-online.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../clases-online.test-samples';

import { ClasesOnlineService } from './clases-online.service';

const requireRestSample: IClasesOnline = {
  ...sampleWithRequiredData,
};

describe('ClasesOnline Service', () => {
  let service: ClasesOnlineService;
  let httpMock: HttpTestingController;
  let expectedResult: IClasesOnline | IClasesOnline[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClasesOnlineService);
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

    it('should create a ClasesOnline', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clasesOnline = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(clasesOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClasesOnline', () => {
      const clasesOnline = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(clasesOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClasesOnline', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClasesOnline', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClasesOnline', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addClasesOnlineToCollectionIfMissing', () => {
      it('should add a ClasesOnline to an empty array', () => {
        const clasesOnline: IClasesOnline = sampleWithRequiredData;
        expectedResult = service.addClasesOnlineToCollectionIfMissing([], clasesOnline);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clasesOnline);
      });

      it('should not add a ClasesOnline to an array that contains it', () => {
        const clasesOnline: IClasesOnline = sampleWithRequiredData;
        const clasesOnlineCollection: IClasesOnline[] = [
          {
            ...clasesOnline,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClasesOnlineToCollectionIfMissing(clasesOnlineCollection, clasesOnline);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClasesOnline to an array that doesn't contain it", () => {
        const clasesOnline: IClasesOnline = sampleWithRequiredData;
        const clasesOnlineCollection: IClasesOnline[] = [sampleWithPartialData];
        expectedResult = service.addClasesOnlineToCollectionIfMissing(clasesOnlineCollection, clasesOnline);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clasesOnline);
      });

      it('should add only unique ClasesOnline to an array', () => {
        const clasesOnlineArray: IClasesOnline[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const clasesOnlineCollection: IClasesOnline[] = [sampleWithRequiredData];
        expectedResult = service.addClasesOnlineToCollectionIfMissing(clasesOnlineCollection, ...clasesOnlineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const clasesOnline: IClasesOnline = sampleWithRequiredData;
        const clasesOnline2: IClasesOnline = sampleWithPartialData;
        expectedResult = service.addClasesOnlineToCollectionIfMissing([], clasesOnline, clasesOnline2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clasesOnline);
        expect(expectedResult).toContain(clasesOnline2);
      });

      it('should accept null and undefined values', () => {
        const clasesOnline: IClasesOnline = sampleWithRequiredData;
        expectedResult = service.addClasesOnlineToCollectionIfMissing([], null, clasesOnline, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clasesOnline);
      });

      it('should return initial array if no ClasesOnline is added', () => {
        const clasesOnlineCollection: IClasesOnline[] = [sampleWithRequiredData];
        expectedResult = service.addClasesOnlineToCollectionIfMissing(clasesOnlineCollection, undefined, null);
        expect(expectedResult).toEqual(clasesOnlineCollection);
      });
    });

    describe('compareClasesOnline', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClasesOnline(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareClasesOnline(entity1, entity2);
        const compareResult2 = service.compareClasesOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareClasesOnline(entity1, entity2);
        const compareResult2 = service.compareClasesOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareClasesOnline(entity1, entity2);
        const compareResult2 = service.compareClasesOnline(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
