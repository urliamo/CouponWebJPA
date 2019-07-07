import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public createCustomer(customer: Customer): Observable<any> {

    return this.http.post("http://localhost:8080/customers/unsecured", customer);

  }

  public updateCustomer(customer: Customer, token: number): Observable<any> {

    return this.http.put(`http://localhost:8080/customers?token=${token}`, customer);

  }

  public deleteCustomer(customerId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/customers/${customerId}?token=${token}`);

  }

  public getCustomerName(customerId: number, token: number): Observable<string> {

    return this.http.get<string>(`http://localhost:8080/customers/name/${customerId}?token=${token}`);

  }

  public getCustomer(customerId: number, token: number): Observable<Customer> {

    return this.http.get<Customer>(`http://localhost:8080/customers/${customerId}?token=${token}`);

  }

  public getAllCustomers(token: number): Observable<Customer[]> {

    return this.http.get<Customer[]>(`http://localhost:8080/customers?token=${token}`);

  }

}