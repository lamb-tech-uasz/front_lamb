import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { config } from "../config/config";
import { AbstractService } from "./abstract.service";
import { GetTokenService } from "./utils/get-token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuth: boolean = false;
  private subjAuth = new Subject<boolean>();
  utilisateur!: any;
  email!: string;
  i: number = 0;
  isAdmin: boolean = false;
  constructor(
    private routes: Router,
    private http: HttpClient,
    private token: GetTokenService,
    private abstract: AbstractService
  ) {
    this.getToken();
  }
  loginStatus$ = new BehaviorSubject(false);

  getStatus() {
    return this.loginStatus$.asObservable();
  }

  getUserIdFromLocalStorage(): number | null {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.id;
    }
    return null;
  }
  private setStatus(stat: boolean) {
    this.loginStatus$.next(stat);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem("user");
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

  connexion(donnees: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${config.apiUrl}/auth/signin`, donnees).subscribe(
        (user) => {
          this.isAuth = true;
          this.subjAuth.next(this.isAuth);
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  register(donnees: any) {
    return this.abstract.envoiL(`auth/inscrire`, donnees);
  }
  deconnexion() {
    console.log("deconnexion");
    this.isAuth = false;
    this.subjAuth.next(this.isAuth);
    localStorage.clear();
    this.setStatus(false);
this.routes.navigateByUrl('/');
    // window.location.reload();
  }
}
