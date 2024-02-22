import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVideosClaseOnline } from '../videos-clase-online.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../videos-clase-online.test-samples';

import { VideosClaseOnlineService } from './videos-clase-online.service';

const requireRestSample: IVideosClaseOnline = {
  ...sampleWithRequiredData,
};

describe('VideosClaseOnline Service', () => {
  let service: VideosClaseOnlineService;
  let httpMock: HttpTestingController;
  let expectedResult: IVideosClaseOnline | IVideosClaseOnline[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VideosClaseOnlineService);
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

    it('should create a VideosClaseOnline', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const videosClaseOnline = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(videosClaseOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VideosClaseOnline', () => {
      const videosClaseOnline = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(videosClaseOnline).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VideosClaseOnline', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VideosClaseOnline', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VideosClaseOnline', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVideosClaseOnlineToCollectionIfMissing', () => {
      it('should add a VideosClaseOnline to an empty array', () => {
        const videosClaseOnline: IVideosClaseOnline = sampleWithRequiredData;
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing([], videosClaseOnline);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(videosClaseOnline);
      });

      it('should not add a VideosClaseOnline to an array that contains it', () => {
        const videosClaseOnline: IVideosClaseOnline = sampleWithRequiredData;
        const videosClaseOnlineCollection: IVideosClaseOnline[] = [
          {
            ...videosClaseOnline,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing(videosClaseOnlineCollection, videosClaseOnline);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VideosClaseOnline to an array that doesn't contain it", () => {
        const videosClaseOnline: IVideosClaseOnline = sampleWithRequiredData;
        const videosClaseOnlineCollection: IVideosClaseOnline[] = [sampleWithPartialData];
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing(videosClaseOnlineCollection, videosClaseOnline);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(videosClaseOnline);
      });

      it('should add only unique VideosClaseOnline to an array', () => {
        const videosClaseOnlineArray: IVideosClaseOnline[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const videosClaseOnlineCollection: IVideosClaseOnline[] = [sampleWithRequiredData];
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing(videosClaseOnlineCollection, ...videosClaseOnlineArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const videosClaseOnline: IVideosClaseOnline = sampleWithRequiredData;
        const videosClaseOnline2: IVideosClaseOnline = sampleWithPartialData;
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing([], videosClaseOnline, videosClaseOnline2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(videosClaseOnline);
        expect(expectedResult).toContain(videosClaseOnline2);
      });

      it('should accept null and undefined values', () => {
        const videosClaseOnline: IVideosClaseOnline = sampleWithRequiredData;
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing([], null, videosClaseOnline, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(videosClaseOnline);
      });

      it('should return initial array if no VideosClaseOnline is added', () => {
        const videosClaseOnlineCollection: IVideosClaseOnline[] = [sampleWithRequiredData];
        expectedResult = service.addVideosClaseOnlineToCollectionIfMissing(videosClaseOnlineCollection, undefined, null);
        expect(expectedResult).toEqual(videosClaseOnlineCollection);
      });
    });

    describe('compareVideosClaseOnline', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVideosClaseOnline(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVideosClaseOnline(entity1, entity2);
        const compareResult2 = service.compareVideosClaseOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVideosClaseOnline(entity1, entity2);
        const compareResult2 = service.compareVideosClaseOnline(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVideosClaseOnline(entity1, entity2);
        const compareResult2 = service.compareVideosClaseOnline(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
