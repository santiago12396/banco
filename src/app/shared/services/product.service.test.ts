import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { IAlterProductResp, ICreateProductDTO, IProduct, IProductResp, IUpdateProductDTO } from '../models/product.model';
import { environment } from '../../../environments/environment.development';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('tests for getProducts', () => {
    test('should return a list of products', doneFn => {
        const mockData: IProductResp = {
          data: [
            {
              id: "8245",
              name: "product 48",
              description: "description 4",
              logo: "logo-3.png",
              date_release: "2025-01-01",
              date_revision: "2025-01-01"
            }
          ]
        };

        service.getProducts()
          .subscribe(resp => {
              expect(resp).toEqual(mockData);
              doneFn();
          });

          const url = `${environment.apiUrl}/products`;
          const req = httpTestingController.expectOne(url);

          expect(req.request.method).toBe('GET');
          req.flush(mockData);
     });
  });

  describe('tests for createProduct', () => {
    test('should return the product created', doneFn => {
        const mockData: ICreateProductDTO = {
          name: "product 48",
          description: "description 4",
          logo: "logo-3.png",
          date_release: "2025-01-01",
          date_revision: "2025-01-01"
       };

       const mockDataResp: IAlterProductResp = {
          message: 'Product added successfully',
          product: {
            id: '8245',
            name: "product 48",
            description: "description 4",
            logo: "logo-3.png",
            date_release: "2025-01-01",
            date_revision: "2025-01-01"
       }
      };

        service.createProduct(mockData)
          .subscribe(resp => {
              expect(resp).toEqual(mockDataResp);
              doneFn();
          });

          const url = `${environment.apiUrl}/products`;
          const req = httpTestingController.expectOne(url);

          expect(req.request.method).toBe('POST');
          expect(req.request.body).toEqual(mockData);

          req.flush(mockDataResp);
     });
  });

  describe('tests for updateProduct', () => {
    test('should return the product updated', doneFn => {
      const mockData: IUpdateProductDTO = {
        id: "8245",
        name: "product 48 actualizado",
        description: "description 4",
        logo: "logo-3.png",
        date_release: "2025-01-01",
        date_revision: "2025-01-01"
      };

      const mockDataResp: IAlterProductResp = {
        message: 'Product updated successfully',
        product: {
          id: "8245",
          name: "product 48 actualizado",
          description: "description 4",
          logo: "logo-3.png",
          date_release: "2025-01-01",
          date_revision: "2025-01-01"
        }
      }

      service.updateProduct(mockData)
        .subscribe(resp => {
            expect(resp).toEqual(mockDataResp);
            doneFn();
        });

        const url = `${environment.apiUrl}/products/${mockData.id}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockData);

        req.flush(mockDataResp);
     });
  });

  describe('tests for deleteProduct', () => {
    test('should return the message of product deleted', doneFn => {
        const productId = '8245';

        const mockDataResp = {
            message: 'Product deleted successfully',
        }

        service.deleteProduct(productId)
          .subscribe(resp => {
              expect(resp).toEqual(mockDataResp);
              doneFn();
          });

        const url = `${environment.apiUrl}/products/${productId}`;
        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toBe('DELETE');
        req.flush(mockDataResp);
     });
  });

  describe('tests for existProductByID', () => {
    test('should return true if exist the product', doneFn => {
      const mockProducts: IProduct[] = [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2024-02-01', date_revision: '2024-02-01' }
      ];

      const productId = '1';
      const expectedResp = mockProducts.some(product => product.id === productId);

      service.existProductByID(productId)
        .subscribe(resp => {
            expect(resp).toEqual(expectedResp);
            doneFn();
        });

      const url = `${environment.apiUrl}/products/verification/${productId}`;
      const req = httpTestingController.expectOne(url);

      expect(req.request.method).toBe('GET');
      req.flush(expectedResp);
      });
  });

  describe('tests for getProductByID', () => {
    test('should return the product with the specified ID', () => {
      const mockProducts: IProduct[] = [
        { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2024-01-01', date_revision: '2024-01-01' },
        { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2024-02-01', date_revision: '2024-02-01' }
      ];

      const productId = '2';
      const expectedProduct = mockProducts.find(product => product.id === productId)!;

      service.getProductByID(productId).subscribe(product => {
        expect(product).toEqual(expectedProduct);
      });

      const url = `${environment.apiUrl}/products`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(expectedProduct);
    });
  });

});
