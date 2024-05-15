import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of, retry, tap } from 'rxjs';
import { config, headers } from '../config/config';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private abstract: AbstractService) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUrl}/produits/find-by-user`, {headers:headers}).pipe(
      tap(produits => console.log(produits)),
      first(),
      retry(3),
      catchError((error) => {
        return of([]);
      })
    );
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUrl}/produits/not-auth/all`).pipe(
      tap(produits => console.log(produits)),
      first(),
      retry(3),
      catchError((error) => {
        return of([]);
      })
    );
  }
  postProducts(data: any) {
    return this.abstract.envoi(`produits/create`, data)
  }

  deleteProduct(id: number) {
    return this.abstract.supprimer(`produits/${id}`)
  }
}
