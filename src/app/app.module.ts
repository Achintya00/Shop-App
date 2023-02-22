import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
// import { AddProductsComponent } from './Components/add-products/add-products.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ProductDetailComponent } from './Components/products/product-detail/product-detail.component';
import { EmailValidationDirective } from './Directives/email-validation.directive';
import { ProductDetailsService } from './Services/product-details.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    // AddProductsComponent,
    RegisterComponent,
    LoginComponent,
    ErrorPageComponent,
    ProductDetailComponent,
    EmailValidationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [ProductDetailsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
