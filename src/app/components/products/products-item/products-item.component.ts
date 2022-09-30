import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  @Input() productItem: Product;

  image;

  constructor(
    private http: HttpClient,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.image =
      'https://localhost:5001/Resources/Images/' + this.productItem.photo;
  }
  edit() {
    this.router.navigateByUrl(`/edit-product/${this.productItem.id}`);
  }
  delete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Está seguro de eliminar el producto: ${this.productItem.name}?`,
        text: '¡Luego no podrá revertir los cambios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, canelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productsService.deleteProduct(this.productItem.id).subscribe(respose => {
            console.log(respose);
          })
          swalWithBootstrapButtons.fire(
            '¡Eliminado!',
            'Su producto ha sido eliminado',
            'success'
          ).then(function(){ 
            location.reload()});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su producto no ha sido eliminado',
            'error'
          );
        }
      });
  }
}
