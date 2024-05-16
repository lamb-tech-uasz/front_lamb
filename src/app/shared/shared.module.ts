import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FeaturesComponent } from "../features/features.component";
import { HomeComponent } from "../features/home/home.component";
import { MesProductsComponent } from "../features/products/mes-products/mes-products.component";
import { ProductListComponent } from "../features/products/product-list/product-list.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { PanierComponent } from "../features/products/panier/panier.component";

const routes: Routes = [
  {
    path: "",
    component: FeaturesComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "products",
        component: ProductListComponent,
      },
      {
        path: "mes-products",
        component: MesProductsComponent,
      },
      {
        path: "mon-panier",
        component: PanierComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
