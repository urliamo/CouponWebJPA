import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../models/LoginForm';
import { LoginData } from '../models/LoginData';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public login(user: LoginForm): Observable<LoginData> {

    return this.http.post<LoginData>("http://localhost:8080/users/login/unsecured", user);

  }

  public logOut(token: number): Observable<any> {

    return this.http.get(`http://localhost:8080/users/logout?token=${token}`);

  }

  public createUser(user: User, token: number): Observable<any> {

    return this.http.post(`http://localhost:8080/users?token=${token}`, user);

  }

  public updateUser(user: User, token: number): Observable<any> {

    return this.http.put(`http://localhost:8080/users?token=${token}`, user);

  }

  public deleteMyUser(userId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/users/${userId}?token=${token}`);

  }

  public deleteUser(userId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/users/${userId}?token=${token}`);

  }

  public getUserName(userId: number, token: number): Observable<string> {

    return this.http.get<string>(`http://localhost:8080/users/name/${userId}?token=${token}`);

  }

  public getUser(userId: number, token: number): Observable<User> {

    return this.http.get<User>(`http://localhost:8080/users/${userId}?token=${token}`);

  }

  public getAllUsers(token: number): Observable<User[]> {

    return this.http.get<User[]>(`http://localhost:8080/users?token=${token}`);

  }

}