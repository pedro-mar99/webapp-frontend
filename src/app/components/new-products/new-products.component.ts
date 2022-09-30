import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss'],
})
export class NewProductsComponent implements OnInit {
  form = this.fb.group({
    name: '',
    description: '',
    price: 0,
    photo: '',
  });
  submitMessage: boolean = false;
  formData = new FormData();
  screenMode = '';
  buttonTitle = '';
  isEditPage = false;
  productId = null;
  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.setMode();
    this.setScreenMode();
    if (this.isEditPage) {
      this.getProduct();
    }
  }
  setMode() {
    this.isEditPage = this.productId !== null;
  }
  setScreenMode() {
    this.screenMode = this.isEditPage ? 'Editar' : 'Nuevo';
    this.buttonTitle = this.isEditPage ? 'Guardar' : 'Agregar';
  }

  onSubmit() {
    return this.isEditPage ? this.editProduct() : this.createProduct();
  }

  editProduct() {
    this.productsService
      .updateProduct(this.productId, this.form.value)
      .subscribe((response) => {
        this.router.navigateByUrl('/products');
        this.toastr.success('Producto editado exitosamente!', '', {
          positionClass: 'toast-bottom-right',
        });
      });
  }
  createProduct() {
    console.log(this.form.value);
    this.http
      .post('https://localhost:5001/api/upload', this.formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((res) => {
        console.log(res);
      });
    this.productsService.newProduct(this.form.value).subscribe((response) => {
      console.log(response);
      this.submitMessage = true;
    });
  }
  setFile(event) {
    let fileToUpload = <File>event.target.files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.form.value.photo = fileToUpload.name;
    //ESTO SE DISPARA CUANDO CARGO LA IMG. el http post se dispara, tendria que guardar
    // la img en un file, setear campo formulario foto y cuando aprete agg ahi subir primero img y dsp creo producto.
    // ver como hacer retrieve de la imagen segun el producto.
  }
  getProduct() {
    this.productsService
      .getProductById(this.productId)
      .subscribe((response) => {
        console.log(response);
        this.form.patchValue(response); //carga en el form los datos traidos.
      });
  }
}
