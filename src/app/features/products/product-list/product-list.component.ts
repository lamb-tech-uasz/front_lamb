import { Component } from '@angular/core';
import { Subject, first, lastValueFrom, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  isAuth: boolean = false;
  products: any
  destroy$ = new Subject();

  constructor(private authService: AuthService, private productService:ProductService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isLoggedIn()
    this.getProducts()
  }

  async getProducts() {
    try {
      this.products = await lastValueFrom(
        this.productService.getProducts()
          .pipe(
            takeUntil(this.destroy$),
            first(),
          )
      );
    } catch (error) {
      console.error(error)

    }
  }
}
