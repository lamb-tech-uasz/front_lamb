import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { MapsComponent } from './maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps'

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path:'products',
        component: ProductListComponent
      }

    ],
  }];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    FeaturesComponent,
    HomeComponent,
    ProductListComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    RouterModule.forChild(routes)
  ]
})
export class FeaturesModule { }
