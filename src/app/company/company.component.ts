import { Component, OnInit } from '@angular/core';
import { Coupon } from '../shared/models/Coupon';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CouponService } from '../shared/services/coupon.service';
import { Router } from '@angular/router';
import { Company } from '../shared/models/Company';
import { Category } from '../shared/models/Category';
import { ClientType } from '../shared/models/ClientType';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public myName: string = null;
  public token: number = null;
  public id: number = null;
  public companyId: number = null;

  //create coupon && update
  private couponId: number = null;
  private category: Category = null;
  private title: string = null;
  private description: string = null;
  private startDate: Date = null;
  private endDate: Date = null;
  private amount: number = null;
  private price: number = null;


  private maxPrice: number = null;

  //update user
  private userName: string = null;
  private password: string = null;
  private email: string = null;
  // toggles
  public toggleGetCompany: boolean = false;
  public toggleGetUser: boolean = false;
  public toggleCreateCoupon: boolean = false;
  public toggleGetCompanyCouponsByCompanyId: boolean = false;
  public toggleGetCompanyCouponsByCategory: boolean = false;
  public toggleGetCompanyCouponsByMaxPrice: boolean = false;
  public toggleUpdateUser: boolean = false;
  public toggleUpdateCoupon: boolean = false;

  // objects
  public user: User = null;
  public company: Company = null;
  public companyCouponsByCompanyId: Coupon[] = null;
  public companyCouponsByCategory: Coupon[] = null;
  public companyCouponsByMaxPrice: Coupon[] = null;
  public categories: Category[] = null;

  constructor(private userService: UserService, private companyService: CompanyService, private couponService: CouponService, private router: Router) { }

  ngOnInit(): void {

    this.categories = Object.values(Category).filter(index => (typeof Category[index] === 'number'))

    this.token = parseInt(sessionStorage.getItem("token"));
    this.id = parseInt(sessionStorage.getItem("id"));
    this.companyId = parseInt(sessionStorage.getItem("company"));

    this.userService.getUserName(this.id, this.token).subscribe(

      res => this.myName = res,

      err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

    );

  }

  public logOut(): void {

    this.userService.logOut(this.token).subscribe

      (

        () => {

          alert("You are logged out!\nWe hope to see you again!");
          sessionStorage.clear();
          this.router.navigate(["/login"]);

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public createCoupon(): void {
	
	let company: Company = new Company(null, null, this.companyId);
    let image = this.category + ".jpg"
    let coupon: Coupon = new Coupon(this.company, this.title, this.description, this.category, this.startDate, this.endDate, this.amount, this.price, image);

    this.couponService.createCoupon(coupon, this.token).subscribe

      (

        () => alert("Your coupon has been created"),

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateCoupon(): void {

	let company: Company = new Company(null, null, this.companyId);
    let image = this.category + ".jpg"
    let coupon: Coupon = new Coupon(company, this.title, this.description, this.category, this.startDate, this.endDate, this.amount, this.price, image, this.couponId);

    this.couponService.updateCoupon(coupon, this.token).subscribe

      (

        () => alert("Your coupon has been updated"),

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateUser(): void {

    let type: ClientType = ClientType.Company
    let user: User = new User(this.email, this.userName, this.password, this.id, type);

    this.userService.updateUser(user, this.token).subscribe

      (

        () => {

          this.myName = user.userName;

          alert("Your user has been update");

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deleteCoupon(couponId: number, type: string, index: number): void {

    this.couponService.deleteCoupon(couponId, this.companyId, this.token).subscribe

      (

        () => {

          alert("Your coupon has been deleted")

          if (type === "id")
            this.updateCouponsArray(this.companyCouponsByCompanyId, index);

          else if (type === "category")
            this.updateCouponsArray(this.companyCouponsByCategory, index);

          else
            this.updateCouponsArray(this.companyCouponsByMaxPrice, index);

        },
        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deleteMyUser(): void {

    this.userService.deleteMyUser(this.id, this.token).subscribe

      (

        () => {

          alert("Your user has been deleted");
          this.router.navigate(["/login"]);

        },
        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompany(): void {

    this.companyService.getCompany(this.companyId, this.token).subscribe

      (

        res => {

          this.company = res;
          this.isToggleGetCompany();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getUser(): void {

    this.userService.getUser(this.id, this.token).subscribe

      (

        res => {

          this.user = res;
          this.isToggleGetUser();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompanyCouponsByCompanyId(): void {

    this.couponService.getCompanyCouponsByCompanyId(this.companyId, this.token).subscribe

      (

        res => {
          this.companyCouponsByCompanyId = res;
          this.isToggleGetCompanyCouponsByCompanyId();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompanyCouponsByCategory(): void {

    if (this.category == null)
      alert("Enter category plz");
    else {

      this.couponService.getCompanyCouponsByCategory(this.companyId, this.category, this.token).subscribe

        (

          res => this.companyCouponsByCategory = res,

          err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );

    }

  }

  public getCompanyCouponsByMaxPrice(): void {

    if (this.maxPrice == null)
      alert("Enter max price plz");

    else {

      this.couponService.getCompanyCouponsByMaxPrice(this.companyId, this.maxPrice, this.token).subscribe

        (

          res => this.companyCouponsByMaxPrice = res,

          err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );

    }

  }

  private updateCouponsArray(array: Coupon[], indexToDelete: number): void {

    array.splice(indexToDelete, 1);

  }

  public isToggleGetCompany(): void {
    this.toggleGetCompany = true;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleGetUser(): void {
    this.toggleGetCompany = false;
    this.toggleGetUser = true;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleCreateCoupon(): void {

    this.title = null;
    this.couponId = null;
    this.category = null;
    this.title = null;
    this.description = null;
    this.startDate = null;
    this.endDate = null;
    this.amount = null;
    this.price = null;

    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = true;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleGetCompanyCouponsByCompanyId(): void {
    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = true;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleGetCompanyCouponsByCategory(): void {
    this.category = null;
    this.companyCouponsByCategory = null;
    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = true;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleGetCompanyCouponsByMaxPrice(): void {
    this.maxPrice = null;
    this.companyCouponsByMaxPrice = null;
    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = true;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = false;
  }

  public isToggleUpdateUser(): void {
    this.userName = null;
    this.password = null;
    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = true;
    this.toggleUpdateCoupon = false;
  }

  public isToggleUpdateCoupon(couponId: number): void {

    this.title = null;
    this.couponId = null;
    this.category = null;
    this.title = null;
    this.description = null;
    this.startDate = null;
    this.endDate = null;
    this.amount = null;
    this.price = null;

    this.couponId = couponId;
    this.toggleGetCompany = false;
    this.toggleGetUser = false;
    this.toggleCreateCoupon = false;
    this.toggleGetCompanyCouponsByCompanyId = false;
    this.toggleGetCompanyCouponsByCategory = false;
    this.toggleGetCompanyCouponsByMaxPrice = false;
    this.toggleUpdateUser = false;
    this.toggleUpdateCoupon = true;
  }



}