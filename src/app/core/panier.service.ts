import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../shared/interfaces/product';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  constructor() { }
  panier$ = new BehaviorSubject<Product[]>([]);

  ajouter(obj: Product) {
    this.panier$.next([obj, ...this.panier$.value])
  }

  enlever(obj: Product) {
    this.panier$.next(this.panier$.value.filter((el) => obj.id !== el.id))
  }
}