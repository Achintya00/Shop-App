import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  body: any;
  getProducts$ = this.http.get<any>('/api/ProductDetails');
  postRegister(user: any) {
    this.http.post('/ap/RegisterUsers', user);
  }
}
