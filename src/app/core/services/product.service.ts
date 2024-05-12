import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, first, of, retry, tap } from 'rxjs';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUrl}/`).pipe(
      tap(produits => console.log(produits)),
      first(),
      retry(3),
      catchError((error) => {
        return of([]);
      })
    );
  }
}
