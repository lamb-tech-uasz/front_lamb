import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GetTokenService } from './utils/get-token.service';
import { config } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth: boolean = false;
  private subjAuth = new Subject<boolean>();
  utilisateur!: any
  email!: string
  i: number = 0
  isAdmin: boolean = false
  constructor(private routes: Router, private http: HttpClient, private token: GetTokenService) {
    this.getToken();
  }
  loginStatus$ = new BehaviorSubject(false);

  getStatus() {
    return this.loginStatus$.asObservable();
  }

  private setStatus(stat: boolean) {
    this.loginStatus$.next(stat);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    this.setStatus(true);
    return !!user;
  }
  async getToken() {
    this.token.subToken.subscribe((token) => {
      this.isAuth = token;
      this.subjAuth.next(this.isAuth);
    });
  }

  estConnecter() {
    return this.subjAuth.asObservable();
  }

  estSuper() {
    const role = localStorage.getItem('roleuser')
    if (role !== 'super' || role === null) {
      return false
    } else {
      return true
    }
  }
  connexion(donnees: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${config.apiUrl}/auth/signin`, donnees).subscribe((user) => {
        this.isAuth = true;
        this.subjAuth.next(this.isAuth);
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }

  deconnexion() {
    this.isAuth = false;
    this.subjAuth.next(this.isAuth);
    localStorage.clear();
    this.setStatus(false);
    this.routes.navigate(['/']);
  }
}
