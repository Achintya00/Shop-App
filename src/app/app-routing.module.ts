import { AddProductsComponent } from './Components/add-products/add-products.component';
import { LoginGuard } from './guards/login.guard';
import { ProductDetailComponent } from './Components/products/product-detail/product-detail.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'product', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  {
    path: 'addProduct',
    loadChildren: () =>
      import('./Components/add-products/add-product.module').then(
        (m) => m.AddProductModule
      ),
    // component: AddProductsComponent,
    canActivate: [LoginGuard],
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
