import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Order } from '../models/order';
import { UserAvatar } from '../models/userimg';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  notif_api_url_dt: string = 'http://localhost:3000/pushDatThue';
  notif_api_url_tt: string = 'http://localhost:3000/pushThanhToan';
  constructor(private http: HttpClient) {}
  postUser(data: User): Observable<any> {
    return this.http.post<User>(`${baseUrl}/user`, data);
  }
  getByIdUser(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/${id}`);
  }
  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${baseUrl}/users`)
      .pipe(retry(2), catchError(this.handle));
  }
  sendNotificationDT(info: PushSubscription) {
    return this.http
      .post(this.notif_api_url_dt, info)
      .pipe(catchError(this.handleError));
  }
  sendNotificationTT(info: PushSubscription) {
    return this.http
      .post(this.notif_api_url_tt, info)
      .pipe(catchError(this.handleError));
  }
  updateUserNoti(id: string, data: any):Observable<any>{
    return this.http.patch(`${baseUrl}/users/uploadnot/${id}`, data)
  }
  updateUser(id: string, newData: User):Observable<any>{
    return this.http.patch(`${baseUrl}/users/${id}`, newData)
  }
  updateAvatar(id: string, newData: any):Observable<any>{
    return this.http.patch(`${baseUrl}/users/useravatar/${id}`, newData)
  }
  patchUser(id: string, data: User): Observable<any> {
    return this.http.patch(`${baseUrl}/users/doidiem/${id}`, data);
  }
  handleError(error: Error) {
    return throwError(() => new Error(error.message));
  }

}
