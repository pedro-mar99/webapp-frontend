import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl + 'products')
  }

  getProductById(id:string){
    return this.http.get<Product>(`${this.baseUrl}products/${id}`)
  }

  newProduct(value: any){
    return this.http.post(this.baseUrl + 'products/register', value)
  }
  
  updateProduct(id:string, data:any) {
    return this.http.put(`${this.baseUrl}products/${id}`, data)
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.baseUrl}products/${id}`)
  }
}
