import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  @Input() productItem: Product;
  image;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.image = 'https://localhost:5001/Resources/Images/' + this.productItem.photo;
  }
  
}
