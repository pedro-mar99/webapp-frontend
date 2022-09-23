import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      console.log(this.products);      
    })
  }
  // tendria que setear los archivos y ver si se puede mandar la img al componente hijo.
}
