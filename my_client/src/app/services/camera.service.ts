import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Camera } from '../models/camera';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }
  getCameras(): Observable<Camera[]> {
    return this.http
      .get<Camera[]>(`${baseUrl}/cameras`)
      .pipe(retry(2), catchError(this.handle));
  }

  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getByIdCam(id: string): Observable<Camera> {
    return this.http.get<Camera>(`${baseUrl}/cameras/${id}`);
  }

  patchCam(id: string, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/cameras/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/cameras/${id}`);
  }

  uploadData(data: any): Observable<any> {
    return this.http
      .post(`${baseUrl}/camera`, data)
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
