import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  body: boolean = false;
  getProducts() {
    return this.http.get<any>('/api/ProductDetails');
  }
  postRegister(user: any) {
    this.http.post('/app/RegisterUsers', user);
  }
  getProductbyId(id: any) {
    return this.http.get(`/api/ProductDetails/${id}`);
  }
}
