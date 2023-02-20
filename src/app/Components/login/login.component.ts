import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginDetails: any;
  hide = true;
  username: string = '';
  password: string = '';

  //getting the data from login api and validating
  constructor(private login: ProductDetailsService, private route: Router) {}
  ngOnInit(): void {
    this.login.getLoginDetails$.subscribe((data) => {
      this.loginDetails = data;
    });
  }
  hideBtn(e: Event) {
    e.preventDefault();
  }
  //simple authentication
  loginMessage(form: NgForm) {
    this.loginDetails.forEach((element: any) => {
      if (
        element.username === this.username &&
        element.password === this.password
      ) {
        this.route.navigateByUrl('');
      } else {
        alert('login Failed');
      }
    });
    form.resetForm();
  }
}
