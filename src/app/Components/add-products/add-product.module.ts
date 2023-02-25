import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { AddProductsComponent } from './add-products.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AddProductsComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
  ],
  declarations: [AddProductsComponent],
})
export class AddProductModule {}
