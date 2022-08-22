import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { KhuyenMai } from '../models/khuyenmai';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class KhuyenmaiService {


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
  }
  getKhuyenMais(): Observable<KhuyenMai[]> {
    return this.http
      .get<KhuyenMai[]>(`${baseUrl}/khuyenmais`)
      .pipe(retry(2), catchError(this.handle));
  }

  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getByIdKhuyenMai(id: string): Observable<KhuyenMai> {
    return this.http.get<KhuyenMai>(`${baseUrl}/khuyenmais/${id}`);
  }
 
}
