import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {
  form = this.fb.group({
    name: "",
    description: "",
    price: 0,
    photo: ""
  })
  submitMessage: boolean = false;

  constructor(private productsService: ProductsService, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
  }

  createProduct(){
    console.log(this.form.value);
     this.productsService.newProduct(this.form.value).subscribe(response => {
       console.log(response);
       this.submitMessage = true;
     })
  }
  setFile(event){
    let fileToUpload = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log(formData);
    this.form.value.photo = fileToUpload.name;
    this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(res => {
        console.log(res)
      });
      
       //ESTO SE DISPARA CUANDO CARGO LA IMG. el http post se dispara, tendria que guardar
       // la img en un file, setear campo formulario foto y cuando aprete agg ahi subir primero img y dsp creo producto.
       // ver como hacer retrieve de la imagen segun el producto.
  }
}
