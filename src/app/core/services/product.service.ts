import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, first, of, retry, tap } from "rxjs";
import { config } from "../config/config";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUrl}/produits/not-auth/all`).pipe(
      tap((produits) => console.log(produits)),
      first(),
      retry(3),
      catchError((error) => {
        return of([]);
      })
    );
  }
  // getImage(id:any): Observable<any[]> {
  //   return this.http.get<any[]>(`${config.apiUrl}/produits/${id}/photo`).pipe(
  //     tap((produits) => console.log(produits)),
  //     first(),
  //     retry(3),
  //     catchError((error) => {
  //       return of([]);
  //     })
  //   );
  // }
}
