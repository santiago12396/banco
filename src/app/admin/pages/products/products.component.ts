import { Component, inject, OnInit, signal } from '@angular/core';

import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/models/product.model';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { SearchPipe } from '../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    SearchInputComponent,
    SearchPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products = signal<IProduct[]>([]);
  searchTerm = signal('');

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
