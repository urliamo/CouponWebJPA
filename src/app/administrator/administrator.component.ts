import { Component, OnInit } from '@angular/core';
import { Company } from '../shared/models/Company';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CustomerService } from '../shared/services/customer.service';
import { PurchaseService } from '../shared/services/purchase.service';
import { Router } from '@angular/router';
import { Customer } from '../shared/models/Customer';
import { Purchase } from '../shared/models/Purchase';
import { ClientType } from '../shared/models/ClientType';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  public myName: string = null;
  public token: number = null;
  public id: number = null;

  // create & update company
  private companyName: string = null;
  private email: string = null;

  private companyId: number = null;

  // create user
  private userName: string = null;
  private password: string = null;
  private clientType: ClientType = null;
  private companyUserId: number = null;
  private userEmail: string = null;

  // update user
  private userId: number = null;

  // toggles
  public toggleGetUser: boolean = false;
  public toggleUpdateUser: boolean = false;
  public toggleCreateCompany: boolean = false;
  public toggleUpdateCompany: boolean = false;
  public toggleGetAllUsers: boolean = false;
  public toggleGetAllCompanies: boolean = false;
  public toggleGetAllCustomers: boolean = false;
  public toggleGetAllPurchases: boolean = false;
  public toggleCreateUser: boolean = false;

  // objects
  public user: User = null;
  public allUsers: User[] = null;
  public allCustomers: Customer[] = null;
  public allPurchases: Purchase[] = null;
  public allCompanies: Company[] = null;

  constructor(private userService: UserService, private companyService: CompanyService, private customerService: CustomerService, private purchaseService: PurchaseService, private router: Router) { }

  ngOnInit(): void {

    this.token = parseInt(sessionStorage.getItem("token"));
    this.id = parseInt(sessionStorage.getItem("id"));

    this.userService.getUserName(this.id, this.token).subscribe(

      res => this.myName = res,

      err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

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

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public createCompany(): void {

    let company: Company = new Company(this.companyName, this.email);

    this.companyService.createCompany(company, this.token).subscribe

      (

        () => alert("Company has been created"),

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public createUser(): void {

	let user: User = new User( this.userName,this.email, this.password, null, this.clientType, null);
	if (this.clientType === "Company") {
      let company: Company = new Company(null, null, this.companyUserId);
      user.company = company;
    }


    this.userService.createUser(user, this.token).subscribe

      (

        () => alert("User has been created"),

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateUser(): void {

    let user: User = new User(this.userEmail,this.userName, this.password, this.userId, this.clientType);

    this.userService.updateUser(user, this.token).subscribe

      (

        () => {

          alert("user has been updated");
          if (this.id == user.id)
            this.myName = user.userName;

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateCompany(): void {

    let company: Company = new Company(this.companyName, this.email, this.companyId);

    this.companyService.updateCompany(company, this.token).subscribe

      (

        () => alert("company has been updated"),

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

  public deleteUser(userId: number, index: number): void {

    this.userService.deleteUser(userId, this.token).subscribe

      (

        () => {

          alert("user has been deleted");
          this.updateArray(this.allUsers, index);

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deleteCompany(companyId: number, index: number): void {

    this.companyService.deleteCompany(companyId, this.token).subscribe

      (

        () => {

          alert("company has been deleted")
          this.updateArray(this.allCompanies, index);

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

  public getAllCompanies(): void {

    this.companyService.getAllCompanies(this.token).subscribe

      (

        res => {
          this.allCompanies = res;
          this.isToggleGetAllCompanies();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getAllCustomers(): void {

    this.customerService.getAllCustomers(this.token).subscribe

      (

        res => {
          this.allCustomers = res;
          this.isToggleGetAllCustomers();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getAllPurchases(): void {

    this.purchaseService.getAllPurchases(this.token).subscribe

      (

        res => {
          this.allPurchases = res;
          this.isToggleGetAllPurchases();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getAllUsers(): void {
    this.userService.getAllUsers(this.token).subscribe

      (

        res => {
          this.allUsers = res;
          this.isToggleGetAllUsers();

        },

        err => alert("HTTP error! code:" + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  private updateArray<T>(array: T[], indexToDelete: number): void {

    array.splice(indexToDelete, 1);

  }

  // use by html
  public availableToDelete(type: ClientType, id: number): boolean {

    if (type === ClientType.Administrator && id!==this.id) {
		
		return false;
		
	}

    return true;

  }

  public isToggleGetUser(): void {
    this.toggleGetUser = true;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleUpdateUser(userId: number): void {
    this.userName = null;
    this.password = null;

    this.userId = userId;
    this.toggleGetUser = false;
    this.toggleUpdateUser = true;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleCreateCompany(): void {
    this.companyName = null;
    this.email = null;

    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = true;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleUpdateCompany(companyId: number): void {
    this.companyName = null;
    this.email = null;

    this.companyId = companyId;
    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = true;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleGetAllUsers(): void {
    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = true;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleGetAllCompanies(): void {
    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = true;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleGetAllCustomers(): void {
    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = true;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = false;
  }

  public isToggleGetAllPurchases(): void {
    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = true;
    this.toggleCreateUser = false;
  }

  public isToggleCreateUser(type: ClientType, companyId?: number): void {
    this.userName = null;
    this.password = null;
    this.companyUserId = null;
    this.clientType = type;

    if (type === ClientType.Company)
      this.companyUserId = companyId;

    this.toggleGetUser = false;
    this.toggleUpdateUser = false;
    this.toggleCreateCompany = false;
    this.toggleUpdateCompany = false;
    this.toggleGetAllUsers = false;
    this.toggleGetAllCompanies = false;
    this.toggleGetAllCustomers = false;
    this.toggleGetAllPurchases = false;
    this.toggleCreateUser = true;
  }

}