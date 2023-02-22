import { LoginServiceService } from './../../Services/login-service.service';
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
  constructor(
    private login: ProductDetailsService,
    private route: Router,
    private loginService: LoginServiceService
  ) {}
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
    this.loginService.LogIn(this.username, this.password);
    form.resetForm();
  }
}
