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
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AddProductsComponent],
})
export class AddProductModule {}
