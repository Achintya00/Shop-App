import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = [
    'pCategory',
    'pId',
    'pIsInStock',
    'pName',
    'pPrice',
    'Edit',
  ];
  constructor(private service: ProductDetailsService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe((data) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
}
