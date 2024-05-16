import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductListComponent } from "../features/products/product-list/product-list.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MesProductsComponent } from "../features/products/mes-products/mes-products.component";
import { HomeComponent } from "../features/home/home.component";
import { FeaturesComponent } from "../features/features.component";
import { RouterModule, Routes } from "@angular/router";

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
    ],
  },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,RouterModule.forChild(routes),],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
