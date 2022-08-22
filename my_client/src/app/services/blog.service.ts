import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getBlogs(): Observable<Blog[]> {
    return this.http
      .get<Blog[]>(`${baseUrl}/blogs`)
      .pipe(retry(2), catchError(this.handle));
  }
  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getByIdBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${baseUrl}/blogs/${id}`);
  }
}
