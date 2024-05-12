import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { headers } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP error:', error);
    return throwError(error);
  }

  envoi<T>(lien: string, donnees: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${lien}`, donnees, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  recuperer<T>(lien: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${lien}`, { headers: headers })
  }

  modifier<T>(lien: string, donnees: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${lien}`, donnees, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  supprimer<T>(lien: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${lien}`, { headers: headers })
      .pipe(catchError(this.handleError));
  }
}
