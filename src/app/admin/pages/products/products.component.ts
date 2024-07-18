import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products = signal<IProduct[]>([]);

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts()
        .subscribe({
          next: resp => {
            this.products.set(resp.data);
          },
          error: err => {
            console.error('Error:', err);
          }
        })
  }



}
