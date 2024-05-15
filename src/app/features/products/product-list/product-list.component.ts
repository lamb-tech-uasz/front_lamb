import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "./../../../core/services/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  listProduct: any[];
  selectedCategory: string = "";
  filteredProducts: any[];
  categories: string[] = [];
  constructor(
    private routes: Router,
    private productService: ProductService // private route: ActivatedRoute, // private http: HttpClient,
  ) {
    this.listProduct = [];
    this.filteredProducts = [];
    // this.categories = this.getCategories();
    console.log(this.categories);
  }

  ngOnInit(): void {
    this.loadAllProduct();
    this.filterProductsByCategory();
    console.log(this.filterProductsByCategory());
  }

  // *ngFor="let produit of listProduct"
  loadAllProduct() {
    this.productService.getAllProducts().subscribe({
      next: (value) => {
        console.log(value);

        this.setListProduc(value);
        /* Rassembles les categories disponibles */
        this.categories = Array.from(
          new Set(this.listProduct.map((product) => product.categorie))
        );
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setListProduc(data: any[]) {
    // this.listProduct = [];
    this.listProduct = data;
  }

  filterProductsByCategory() {
    if (this.selectedCategory === "") {
      // Show all products if no category is selected
      return this.listProduct;
    } else {
      // Filter products based on category
      return this.listProduct.filter(
        (produit) => produit.categorie == this.selectedCategory
      );
    }
  }

  trackByProduit() {
    console.log(this.filterProductsByCategory());
  }
  // getImageProduct(id: any) {
  //   return this.productService.getImage(id);
  // }
}
