import { ProductDetailsService } from './../../Services/product-details.service';
import { user } from './user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide = true;

  ad: user = {
    firstName: '',
    lastName: '',
    city: '',
    age: 0,
    username: '',
    password: '',
  };
  constructor(private register: ProductDetailsService) {}
  postData() {
    console.log(this.ad);
    this.register.postRegister(this.ad).subscribe((data) => {
      console.log(data);
    });
  }
}
