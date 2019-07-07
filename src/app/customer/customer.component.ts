import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { Customer } from '../shared/models/Customer';
import { Purchase } from '../shared/models/Purchase';
import { CustomerService } from '../shared/services/customer.service';
import { UserService } from '../shared/services/user.service';
import { PurchaseService } from '../shared/services/purchase.service';
import { CouponService } from '../shared/services/coupon.service';
import { Router } from '@angular/router';
import { Coupon } from '../shared/models/Coupon';
import { Category } from '../shared/models/Category';
import { ClientType } from '../shared/models/ClientType';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public myName: string = null;
  public token: number = null;
  public id: number = null;
  private email: string = null;

  // update customer
  private userName: string = null;
  private password: string = null;
  private firstName: string = null;
  private lastName: string = null;

  // amount of purchase
  private amount: number = null;

  private maxPrice: number = null;

  private category: string = null;

  // toggles
  public toggleGetCustomer: boolean = false;
  public toggleGetUser: boolean = false;
  public toggleUpdateCustomer: boolean = false;
  public toggleGetCustomerPurchases: boolean = false;
  public toggleGetAllCoupons: boolean = false;
  public toggleGetCustomerCouponsByCustomerId: boolean = false;
  public toggleGetCustomerCouponsByCategory: boolean = false;
  public toggleGetCustomerCouponsByMaxPrice: boolean = false;

  // objects
  public user: User = null;
  public customer: Customer = null;
  public amountCoupons: number = null;
  public customerPurchases: Purchase[] = null;
  public customerCouponsByCustomerId: Coupon[] = null;
  public customerCouponsByCategory: Coupon[] = null;
  public customerCouponsByMaxPrice: Coupon[] = null;
  public allCoupons: Coupon[] = null;
  public categories: Category[] = null;

  constructor(private customerService: CustomerService, private userService: UserService, private purchaseService: PurchaseService, private couponService: CouponService, private router: Router) { }

  ngOnInit(): void {

    this.categories = Object.values(Category).filter(index => (typeof Category[index] === 'number'))

    this.token = parseInt(sessionStorage.getItem("token"));
    this.id = parseInt(sessionStorage.getItem("id"));

    this.getAllCoupons();

    this.customerService.getCustomerName(this.id, this.token).subscribe

      (

        res => this.myName = res,

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

    this.purchaseService.getAmount(this.id, this.token).subscribe

      (

        res => this.amountCoupons = res,

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public logOut(): void {

    this.userService.logOut(this.token).subscribe

      (

        () => {

          alert("You are log out!\nWe are waiting for next visit");
          sessionStorage.clear();
          this.router.navigate(["/login"]);

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public purchaseCoupon(couponId: number, index: number): void {

    let purchase: Purchase = new Purchase( couponId, this.amount, this.id, null);

    this.purchaseService.purchaseCoupon(purchase, this.token).subscribe

      (

        () => {

          this.amountCoupons += purchase.amount;
          this.allCoupons[index].amount -= purchase.amount;

          alert("Your purchase has been done");
        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateCustomer(): void {

    let type = ClientType.Customer;
    let user: User = new User(this.email,this.userName, this.password, this.id, type);
    let customer: Customer = new Customer(this.firstName, this.lastName, this.id, user);

    this.customerService.updateCustomer(customer, this.token).subscribe

      (

        () => {

          alert("Your customer has been updated")
          this.myName = customer.firstName;

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deleteCustomer(): void {

    this.customerService.deleteCustomer(this.id, this.token).subscribe

      (

        () => {

          alert("Your customer has been deleted");
          this.router.navigate(["/login"]);

        },
        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deletePurchaseById(purchaseId: number, amount: number, type: string, index: number): void {

    this.purchaseService.deletePurchaseById(purchaseId, this.token).subscribe

      (

        () => {

          alert("Your purchase has been deleted")
          this.amountCoupons -= amount;

          if (type === "id")
            this.updateArray(this.customerCouponsByCustomerId, index);
          else if (type === "category")
            this.updateArray(this.customerCouponsByCategory, index);
          else if (type === "maxPrice")
            this.updateArray(this.customerCouponsByMaxPrice, index);
          else
            this.updateArray(this.customerPurchases, index);

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCustomer(): void {

    this.customerService.getCustomer(this.id, this.token).subscribe

      (

        res => {

          this.customer = res;
          this.isToggleGetCustomer();

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getUser(): void {

    this.userService.getUser(this.id, this.token).subscribe

      (

        res => {

          this.user = res;
          this.isToggleGetUser();

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCustomerPurchases(): void {

    this.purchaseService.getCustomerPurchases(this.id, this.token).subscribe

      (

        res => {

          this.customerPurchases = res;
          this.isToggleGetCustomerPurchases();

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCustomerCouponsByCustomerId(): void {

    this.couponService.getCustomerCouponsByCustomerId(this.id, this.token).subscribe

      (

        res => {

          this.customerCouponsByCustomerId = res;
          this.isToggleGetCustomerCouponsByCustomerId();

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCustomerCouponsByCategory(): void {

    if (this.category == null)
      alert("Enter category plz");

    else {

      this.couponService.getCustomerCouponsByCategory(this.id, this.category, this.token).subscribe

        (

          res => this.customerCouponsByCategory = res,

          err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );
    }

  }

  public getCustomerCouponsByMaxPrice(): void {

    if (this.maxPrice == null)
      alert("Enter max price plz");

    else {

      this.couponService.getCustomerCouponsByMaxPrice(this.id, this.maxPrice, this.token).subscribe

        (

          res => this.customerCouponsByMaxPrice = res,

          err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );

    }

  }

  public getAllCoupons(): void {

    this.couponService.getAllCoupons(this.token).subscribe

      (

        res => {

          this.allCoupons = res;
          this.isToggleGetAllCoupons();

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  private updateArray<T>(array: T[], indexToDelete: number): void {

    array.splice(indexToDelete, 1);

  }

  public isToggleGetCustomer(): void {
    this.toggleGetCustomer = true;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetUser(): void {
    this.toggleGetCustomer = false;
    this.toggleGetUser = true;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleUpdateCustomer(): void {

    this.userName = null;
    this.password = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;

    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = true;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetCustomerPurchases(): void {
    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = true;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetAllCoupons(): void {
    this.amount = null;

    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = true;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetCustomerCouponsByCustomerId(): void {
    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = true;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetCustomerCouponsByCategory(): void {
    this.customerCouponsByCategory = null;
    this.category = null;

    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = true;
    this.toggleGetCustomerCouponsByMaxPrice = false;
  }

  public isToggleGetCustomerCouponsByMaxPrice(): void {
    this.customerCouponsByMaxPrice = null;
    this.maxPrice = null;

    this.toggleGetCustomer = false;
    this.toggleGetUser = false;
    this.toggleUpdateCustomer = false;
    this.toggleGetCustomerPurchases = false;
    this.toggleGetAllCoupons = false;
    this.toggleGetCustomerCouponsByCustomerId = false;
    this.toggleGetCustomerCouponsByCategory = false;
    this.toggleGetCustomerCouponsByMaxPrice = true;
  }

}