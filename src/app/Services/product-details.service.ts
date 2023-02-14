import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}
  body: any;
  getProducts$ = this.http.get<any>('/api/ProductDetails').pipe(shareReplay(1));
  postRegister(user: any) {
    this.http.post('/app/RegisterUsers', user);
  }
}
