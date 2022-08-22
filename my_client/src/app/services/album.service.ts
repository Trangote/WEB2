import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Album } from '../models/album';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  getAlbums(): Observable<Album[]> {
    return this.http
      .get<Album[]>(`${baseUrl}/albums`)
      .pipe(retry(2), catchError(this.handle));
  }
  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getByIdAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${baseUrl}/albums/${id}`);
  }
}
