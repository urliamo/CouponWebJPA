import { Injectable } from '@angular/core';
import { Coupon } from '../models/Coupon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  public createCoupon(coupon: Coupon, token: number): Observable<any> {

    return this.http.post(`http://localhost:8080/coupons?token=${token}`, coupon);

  }

  public updateCoupon(coupon: Coupon, token: number): Observable<any> {

    return this.http.put(`http://localhost:8080/coupons?token=${token}`, coupon);

  }

  public deleteCoupon(couponId: number, companyId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/coupons/${couponId}?companyId=${companyId}&token=${token}`);

  }

  public getCompanyCouponsByCompanyId(companyId: number, token: number): Observable<Coupon[]> {

    return this.http.get<Coupon[]>(`http://localhost:8080/coupons/company?companyId=${companyId}&token=${token}`);

  }

  public getCompanyCouponsByCategory(companyId: number, category: Category, token: number): Observable<Coupon[]> {

    return this.http.get<Coupon[]>(`http://localhost:8080/coupons/company/category?companyId=${companyId}&category=${category}&token=${token}`);

  }

  public getCompanyCouponsByMaxPrice(companyId: number, maxPrice: number, token: number): Observable<Coupon[]> {

    return this.http.get<Coupon[]>(`http://localhost:8080/coupons/company/price?companyId=${companyId}&maxPrice=${maxPrice}&token=${token}`);

  }


  public getAllCoupons(token: number): Observable<Coupon[]> {

    return this.http.get<Coupon[]>(`http://localhost:8080/coupons?token=${token}`);

  }

}