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
  @ViewChild('registerForm')
  registerForm: any;
  //@ViewChild('inputFeild', { read: ElementRef }) inputFeild: any;
  ngAfterViewInit(): void {
    // if (this.inputFeild.nativeElement.value === '') {
    //   this.sol = false;
    //   console.log(this.sol);
    // }
    console.log(this.registerForm.form.errors?.['maxlength']);
  }
  hide = true;
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
  postData() {
    console.log(this.ad);
    this.register.postRegister(this.ad).subscribe((data) => {
      console.log(data);
    });
  }
}
