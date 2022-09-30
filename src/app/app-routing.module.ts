import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewProductsComponent } from './components/new-products/new-products.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
      {path: 'products', component: ProductsComponent},
      {path: 'new-products', component: NewProductsComponent},
      {path: 'edit-product/:id', component: NewProductsComponent}
    ]
  },
  // {path: '**', component: NotFoundComponent, pathMatch: 'full'} PARA PAGINA NOTFOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
