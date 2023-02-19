import { NgForm } from '@angular/forms';
import { ProductDetailsService } from './../../Services/product-details.service';
import { user } from './user.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  // @ViewChild('registerForm')
  // registerForm: any;
  ngAfterViewInit(): void {}
  hide = true;
  //default data for forms
  ad: user = {
    firstName: '',
    lastName: '',
    city: '',
    age: undefined,
    username: '',
    password: '',
  };
  ngOnInit(): void {}
  constructor(private register: ProductDetailsService) {}

  //posting the data to backend
  postData(registerForm: NgForm) {
    console.log(this.ad);
    this.register.postRegister(this.ad).subscribe((data) => {
      registerForm.reset();
    });
  }
  //default behavior was occuring when clicking on eye button in material form
  hideBtn(e: Event) {
    e.preventDefault();
  }
}
