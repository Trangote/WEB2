import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Order } from '../models/order';
import { Studio } from '../models/studio';
const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getByIdOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/orders/${id}`);
  }
  handle(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${baseUrl}/orders`)
      .pipe(retry(2), catchError(this.handle));
  }
  patchOrder(id: string, data: Order): Observable<any> {
    return this.http.patch(`${baseUrl}/orders/${id}`, data);
  }
  postOrder(data: Order): Observable<any> {
    return this.http.post<Order>(`${baseUrl}/order`, data);
  }
}
