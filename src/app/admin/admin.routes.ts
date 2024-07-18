import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { FormProductComponent } from './pages/form-product/form-product.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'form-product',
        component: FormProductComponent
      },
      {
        path: 'form-product/:id',
        component: FormProductComponent
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
];
