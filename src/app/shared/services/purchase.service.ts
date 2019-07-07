import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/Purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  public purchaseCoupon(purchase: Purchase, token: number): Observable<any> {

    return this.http.post(`http://localhost:8080/purchases?token=${token}`, purchase);

  }

  public deletePurchaseById(purchaseId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/purchases/${purchaseId}?token=${token}`);

  }

  public getAmount(customerId: number, token: number): Observable<number> {

    return this.http.get<number>(`http://localhost:8080/purchases/amount?customerId=${customerId}&token=${token}`);

  }

  public getCustomerPurchases(customerId: number, token: number): Observable<Purchase[]> {

    return this.http.get<Purchase[]>(`http://localhost:8080/purchases/customer?customerId=${customerId}&token=${token}`);

  }

  public getAllPurchases(token: number): Observable<Purchase[]> {

    return this.http.get<Purchase[]>(`http://localhost:8080/purchases?token=${token}`);

  }

}