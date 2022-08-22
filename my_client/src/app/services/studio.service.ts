import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Studio } from '../models/studio';

const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class StudioService {

  constructor(private http: HttpClient) { }
  getByIdStu(id: string): Observable<Studio> {
    return this.http.get<Studio>(`${baseUrl}/studios/${id}`);
  }
  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getStudios(): Observable<Studio[]> {
    return this.http
      .get<Studio[]>(`${baseUrl}/studios`)
      .pipe(retry(2), catchError(this.handle));
  }
  patchStu(id: string, data: any): Observable<any> {
    return this.http.patch(`${baseUrl}/studios/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/studios/${id}`);
  }
  uploadData(data: any): Observable<any> {
    return this.http
      .post(`${baseUrl}/studio`, data)
      .pipe(retry(2), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
