import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from '../../../shared/services/product.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';


fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;
  let router: Router;
  let zone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ProductsComponent
      ],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: jest.fn(),
            deleteProduct: jest.fn()
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    zone = TestBed.inject(NgZone);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should load initial products', () => {
    const mockProducts = { data: [{ id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' }] };
    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products()).toEqual(mockProducts.data);
  });

  test('should filter products for search term', () => {
    const searchTerm = 'product 1';

    const mockProducts = {
      data: [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '2', name: 'Product 1', description: 'Description 2', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '3', name: 'Product 2', description: 'Description 3', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' }
      ]
    };

    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    component.handleChangeSearchTerm(searchTerm);
    fixture.detectChanges();

    expect(component.filteredProducts().length).toBe(2);
  });

  test('should filter products for items-per-page', () => {
    const itemsPerPage = 2;

    const mockProducts = {
      data: [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '2', name: 'Product 1', description: 'Description 2', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '3', name: 'Product 2', description: 'Description 3', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' }
      ]
    };

    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    component.handleChangeItemsPerPage(itemsPerPage);
    fixture.detectChanges();

    expect(component.productsAux().length).toBe(2);
  });

  test('should filter products for pagination', () => {
    const itemsPerPage = 2;
    const currentPage = 2;

    const mockProducts = {
      data: [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '3', name: 'Product 3', description: 'Description 3', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '4', name: 'Product 4', description: 'Description 4', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' }
      ]
    };

    jest.spyOn(productService, 'getProducts').mockReturnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    component.handleChangeItemsPerPage(itemsPerPage);
    fixture.detectChanges();

    component.handleChangePageCurrent(currentPage);
    fixture.detectChanges();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    expect(component.productsAux()).toEqual(mockProducts.data.slice(startIndex, endIndex));
  });

  test('should navigate to edit product form', doneFn => {
    const productId = '123';
    const navigateSpy = jest.spyOn(router, 'navigate');

    zone.run(() => {
      component.handleEditProduct(productId);
      doneFn();
    });

    expect(navigateSpy).toHaveBeenCalledWith(['/form-product', productId]);
  });

  test('should open dialog', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' }
    ];

    component.products.set(mockProducts);
    component.handleOpenDialog('1');

    expect(component.dialogTitle()).toBe('¿Estás seguro de eliminar el producto: Product 1?');
    expect(component.isDialogOpen()).toBe(true);
    expect(component.productIDToDelete()).toBe('1');
  });
});
