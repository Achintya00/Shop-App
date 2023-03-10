import { product } from './../Components/add-products/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  body: boolean = false;
  getLoginDetails$ = this.http.get('/api/Logins');
  getProducts() {
    return this.http.get<any>('/api/ProductDetails');
  }
  postRegister(user: any) {
    return this.http.post('/api/RegisterUsers', user);
  }
  getProductbyId(id: any) {
    return this.http.get(`/api/ProductDetails/${id}`);
  }
  deleteProduct(id: number): Observable<product> {
    return this.http.delete<product>(`/api/ProductDetails/${id}`);
  }
}
