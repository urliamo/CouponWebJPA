import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public createCompany(company: Company, token: number): Observable<any> {

    return this.http.post(`http://localhost:8080/Companies?token=${token}`, company);

  }

  public updateCompany(company: Company, token: number): Observable<any> {

    return this.http.put(`http://localhost:8080/Companies?token=${token}`, company);

  }

  public deleteCompany(companyId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/Companies/${companyId}?token=${token}`);

  }

  public getCompany(companyId: number, token: number): Observable<Company> {

    return this.http.get<Company>(`http://localhost:8080/Companies/${companyId}?token=${token}`);

  }

  public getAllCompanies(token: number): Observable<Company[]> {

    return this.http.get<Company[]>(`http://localhost:8080/Companies?token=${token}`);

  }

}