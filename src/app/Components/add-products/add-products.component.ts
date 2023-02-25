import { filter } from 'rxjs';
import { product } from './product';
import { ProductDetailsService } from 'src/app/Services/product-details.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<product>();
  selectedId: any;
  isEdit = false;
  displayedColumns: string[] = [
    'pCategory',
    'pId',
    'pIsInStock',
    'pName',
    'pPrice',
    'Edit',
  ];
  constructor(private service: ProductDetailsService) {}
  @ViewChild(MatTable) table!: MatTable<any>;
  ngOnInit(): void {
    this.service.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    });
  }
  deleteRow(e: any) {
    this.service.deleteProduct(e).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (data: any) => data.pId !== e
      );
    });
  }
}
