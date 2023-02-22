import { Injectable, OnInit } from '@angular/core';
import { ProductDetailsService } from './product-details.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginServiceService implements OnInit {
  // login service implemented

  isLoggedin: boolean = false;
  loginDetails: any;

  constructor(private product: ProductDetailsService, private router: Router) {}
  ngOnInit(): void {
    this.setItem(this.isLoggedin);
  }

  LogIn(username: any, password: any) {
    console.log('in login service');
    this.product.getLoginDetails$.subscribe((data) => {
      this.loginDetails = data;

      this.loginDetails.forEach((item: any) => {
        if (item.username === username && item.password === password) {
          this.isLoggedin = true;
          this.setItem(this.isLoggedin);
          this.getItem();
          this.router.navigateByUrl('');
        } else {
          this.isLoggedin = false;
        }
      });
    });
  }

  setItem(main: boolean) {
    localStorage.setItem('loginStatus', JSON.stringify(main));
  }
  getItem() {
    return JSON.parse(localStorage.getItem('loginStatus') || '{}');
  }
}
