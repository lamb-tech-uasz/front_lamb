import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription, first, lastValueFrom, takeUntil } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ProductService } from "src/app/core/services/product.service";
import { PanierService } from "../../../core/panier.service";

@Component({
  selector: "app-panier-list",
  templateUrl: "./panier.component.html",
  styleUrls: ["./panier.component.scss"],
})
export class PanierComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  totalAmount: number = 0;
  private cartSubscription: Subscription = new Subscription();
  isAuth: boolean = false;
  products: any;
  destroy$ = new Subject();
  categories: string[] = ["fruits", "medicaments", "legumes", "autres"];
  selectedCategory: string = "";
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
    // this.getProducts();

    this.cartSubscription = this.panierService.cartItems.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
  }

  ngOnDestroy(): void {
    // Désabonnez-vous de l'observable lors de la destruction du composant pour éviter les fuites de mémoire
    this.cartSubscription.unsubscribe();
  }
  addQuantiteCart(itemId: number):void {
  this.panierService.addQuantiteCart(itemId);
}

  diminuerQuantiteCart(itemId: number):void {
  this.panierService.diminuerQuantiteCart(itemId);
  }

  removeItemFromCart(itemId: number): void {
    // Supprimer un article du panier en appelant la méthode correspondante du service de panier
    this.panierService.removeItem(itemId);
  }

  viderPanier(): void {
    // Vider le panier en appelant la méthode correspondante du service de panier
    this.panierService.clearCart();
  }
  calculateTotalAmount(): void {
    // Calculer le montant total du panier
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.produit.specialPrice * item.quantite,
      0
    );
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(
        this.productService
          .getProducts()
          .pipe(takeUntil(this.destroy$), first())
      );
    } catch (error) {
      console.error(error);
    }
  }
  /* Filtrer les produits par categorie */
  filterProductsByCategory() {
    if (this.selectedCategory === "") {
      // Show all products if no category is selected
      return this.products;
    } else {
      // Filter products based on category
      return this.products.filter(
        (produit: { categorie: string }) =>
          produit.categorie == this.selectedCategory
      );
    }
  }
}
