import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { FeaturesComponent } from "./features.component";
import { HomeComponent } from "./home/home.component";
import { MapsComponent } from "./maps/maps.component";
import { MesProductsComponent } from "./products/mes-products/mes-products.component";
import { PanierComponent } from "./products/panier/panier.component";
import { ProductListComponent } from "./products/product-list/product-list.component";

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
  declarations: [
    LoginComponent,
    RegisterComponent,
    FeaturesComponent,
    HomeComponent,
    ProductListComponent,
    PanierComponent,
    MapsComponent,
    MesProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    RouterModule.forChild(routes),
  ],
})
export class FeaturesModule {}
