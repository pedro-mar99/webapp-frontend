import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemComponent } from './products-item/products-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
