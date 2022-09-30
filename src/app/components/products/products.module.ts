import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemComponent } from './products-item/products-item.component';
import { NewProductsComponent } from '../new-products/new-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsItemComponent,
    NewProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    ProductsItemComponent,
    NewProductsComponent,
  ]
})
export class ProductsModule { }
