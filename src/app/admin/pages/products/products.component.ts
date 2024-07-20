import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ProductService } from '../../../shared/services/product.service';
import { IProduct } from '../../../shared/models/product.model';

import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { ItemsPerPageComponent } from '../../../shared/components/items-per-page/items-per-page.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DropDownComponent } from '../../../shared/components/drop-down/drop-down.component';
import { DialogComponent } from "../../../shared/components/dialog/dialog.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchInputComponent,
    ItemsPerPageComponent,
    PaginationComponent,
    DropDownComponent,
    DialogComponent
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

  productIDToDelete = signal('');
  isDialogOpen = signal(false);
  dialogTitle = signal('');

  private router = inject(Router);
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

  handleImageError(event: Event): void {
    const defaultImageUrl = '/assets/images/no-image.svg';
    const target = event.target as HTMLImageElement;
    target.src = defaultImageUrl;
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

  handleEditProduct(id: string) {
    this.router.navigate(['/form-product', id]);
  }

  handleOpenDialog(id: string) {
    const product = this.products().find(product => product.id === id);

    this.dialogTitle.set(`¿Estás seguro de eliminar el producto: ${ product?.name }?`);
    this.isDialogOpen.set(true);
    this.productIDToDelete.set(id);
  }

  handleDeleteProduct() {
    this.productService.deleteProduct(this.productIDToDelete())
        .subscribe(() => {
          this.loadProducts();
          this.isDialogOpen.set(false);
          this.router.navigateByUrl('/products');
        });
  }


}
