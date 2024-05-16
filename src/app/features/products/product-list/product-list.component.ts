import { PanierService } from './../../../core/panier.service';
import { PanierComponent } from './../panier/panier.component';
import { Component } from "@angular/core";
import { Subject, first, lastValueFrom, takeUntil } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { ProductService } from "src/app/core/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  isAuth: boolean = false;
  products: any;
  destroy$ = new Subject();
  categories: string[] = ["fruits", "medicaments", "legumes", "autres"];
  selectedCategory: string = "";
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 10; // Nombre d'articles par page
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn();
    this.getProducts();
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
        (produit: { categorie: string; }) => produit.categorie == this.selectedCategory
      );
    }
  }

  addToCart(product:any): void {
    const cartItem = {
      produit: product,
      // methodePaiement: product.name,
      // quantite: product.name,
      // price: product.price,
      quantite: 1 // You can set the initial quantity as desired
    };
    this.panierService.addItem(cartItem);
  }
  /* Syteme de pagination */
   // Méthode pour changer de page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Méthode pour calculer le nombre total de pages
  get pages(): number[] {
    const pageCount = Math.ceil(this.products.length / this.itemsPerPage);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  // Méthode pour récupérer les produits à afficher sur la page actuelle
  get visibleProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filterProductsByCategory().slice(startIndex, endIndex);
  }

}
