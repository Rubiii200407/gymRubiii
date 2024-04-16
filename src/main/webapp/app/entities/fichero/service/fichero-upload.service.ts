
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { saveAs } from 'file-saver';
import { IFileVM } from '../fichero.model';

export type EntityResponseType = FormData;

@Injectable({ providedIn: 'root' })
export class FicheroUploadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/upload');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  saveFile(fichero: IFileVM, id: string) {
    return this.http.post<IFileVM>(`${this.resourceUrl}/${id}/save-file`, fichero, { observe: 'response' });
  }
  saveFileComentarioDeporte(fichero: IFileVM, id: number) {
    return this.http.post<IFileVM[]>(`${this.resourceUrl}/${id}/comentario-file`, fichero, { observe: 'response' });
  }
  saveFileComentarioClase(fichero: IFileVM, id: number) {
    return this.http.post<IFileVM[]>(`${this.resourceUrl}/${id}/comentarioClase-file`, fichero, { observe: 'response' });
  }
  saveFileComentarioPlan(fichero: IFileVM, id: number) {
    return this.http.post<IFileVM[]>(`${this.resourceUrl}/${id}/comentarioPlan-file`, fichero, { observe: 'response' });
  }
  saveFileComentarioNutricion(fichero: IFileVM, id: number) {
    return this.http.post<IFileVM[]>(`${this.resourceUrl}/${id}/comentarioNutricion-file`, fichero, { observe: 'response' });
  }
  getFile(ficheroId: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${ficheroId}/download-file`, { observe: 'response' });
  }
  upload(formData: FormData): Observable<HttpEvent<EntityResponseType>> {
    const req = new HttpRequest('POST', this.resourceUrl, formData, { reportProgress: true });
    return this.http.request(req);
  }

  getFichero(id: number): Observable<Blob> {
    return this.http.get(`${this.applicationConfigService.getEndpointFor('api/download')}/${id}`, {
      observe: 'body',
      responseType: 'blob',
    });
  }
  getDownloadFile(ficheroId: number, ficheroName?: string): Observable<any> {
    return this.http.get(`${this.applicationConfigService.getEndpointFor('api/download')}/${ficheroId}`, { responseType: 'blob' }).pipe(
      tap(res => {
        saveAs(res, ficheroName ?? '');
      })
    );
  }
}
