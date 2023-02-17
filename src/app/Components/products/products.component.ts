import { ProductDetailsService } from './../../Services/product-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productData: any;
  constructor(private product: ProductDetailsService) {}
  ngOnInit(): void {
    this.product.getProducts().subscribe((data) => {
      this.productData = data;
      console.log(this.productData);
    });
  }
}
