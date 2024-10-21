import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../enviroment/environment.prod';
import { productskeystorage } from '../../assets/enums/const';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private statusCurrentOrder: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public dastatusCurrentOrder$: Observable<any[]> = this.statusCurrentOrder.asObservable();
  
  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}`;

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`).pipe(
      tap((response: any) => {
        localStorage.setItem(productskeystorage, JSON.stringify(response.user));
      })
    );
  }

  getFilteredOrders(filters: { status?: string; paymentType?: string; date?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/filter`, filters);
  }

  getStorageOrders(): any {
    const data = localStorage.getItem(productskeystorage);
    if(data != "undefined"){
      return JSON.parse(String(localStorage.getItem(productskeystorage)));
    } else{
      return JSON.parse('{}');
    }
    
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/order/${orderId}`);
  }

  updateOrder(orderId: string, updateData: { GeneralNotes: string; Status: string }): Observable<any> {
    const url = `${this.apiUrl}/orders/order/${orderId}`;
    return this.http.put(url, updateData);
  }

  updateStatusCurrentOrder(data: any): void {
    this.statusCurrentOrder.next(data);
  };


}
