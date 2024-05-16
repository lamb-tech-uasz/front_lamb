import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../shared/interfaces/product";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantite: number;
}

@Injectable({
  providedIn: "root",
})
export class PanierService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems = this.cartSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartSubject.next(this.cart);
    }
  }
  panier$ = new BehaviorSubject<Product[]>([]);

  ajouter(obj: Product) {
    this.panier$.next([obj, ...this.panier$.value]);
  }

  enlever(obj: Product) {
    this.panier$.next(this.panier$.value.filter((el) => obj.id !== el.id));
  }
  viderPanier(obj: Product) {
    this.panier$.next(this.panier$.value.filter((el) => obj.id !== el.id));
  }
  /* *************************** */
  addItem(item: any): void {
    const existingItem = this.cart.find(
      (i) => i.produit.id === item.produit.id
    );
    if (existingItem) {
      existingItem.quantite += item.quantite;
      console.log(existingItem);
    } else {
      this.cart.push(item);
    }
    this.saveCart();
  }
  getNombreArtcle() {
    return this.cart.length;
  }
  removeItem(itemId: number): void {
    this.cart = this.cart.filter((item) => item.produit.id !== itemId);
    this.saveCart();
  }

  addQuantiteCart(itemId: number): void {
    const existingItem = this.cart.find((i) => i.produit.id === itemId);
    if (existingItem) {
      if (existingItem.produit.quantite >= existingItem.quantite + 1)
        existingItem.quantite += 1;
    }
    this.saveCart();
  }

  diminuerQuantiteCart(itemId: number): void {
    const existingItem = this.cart.find((i) => i.produit.id === itemId);
    if (existingItem) {
      if (existingItem.quantite - 1 != 0) existingItem.quantite -= 1;
    }
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  private saveCart(): void {
    // Sauvegarder le contenu du panier dans le stockage local
    localStorage.setItem("cart", JSON.stringify(this.cart));
    // Mettre à jour l'observable pour refléter les changements
    this.cartSubject.next(this.cart);
  }
}
