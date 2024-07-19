import { Component, inject, OnInit, signal } from '@angular/core';

import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/models/product.model';

import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { ItemsPerPageComponent } from '../../../shared/components/items-per-page/items-per-page.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    SearchInputComponent,
    ItemsPerPageComponent,
    PaginationComponent
],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  productsAux = signal<IProduct[]>([]);

  searchTerm = signal('');
  itemsPerPage = signal(5);
  currentPage = signal(1);

  private productService = inject(ProductService);

  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage());
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe({
        next: products => {
          this.products.set(products.data);
          this.applySearchAndPagination();
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }

  applySearchAndPagination(): void {
    const searchTerm = this.searchTerm().toLowerCase();
    const filtered = this.products().filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    this.filteredProducts.set(filtered);
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    this.productsAux.set(this.filteredProducts().slice(startIndex, endIndex));
  }

  handleChangeSearchTerm(event: string): void {
    this.searchTerm.set(event);
    this.currentPage.set(1);
    this.applySearchAndPagination();
  }

  handleChangeItemsPerPage(event: number) {
    this.itemsPerPage.set(event);
    this.currentPage.set(1);
    this.applySearchAndPagination();
  }

  handleChangePageCurrent(event: number) {
    this.currentPage.set(event);
    this.updateDisplayedProducts();
  }

}
