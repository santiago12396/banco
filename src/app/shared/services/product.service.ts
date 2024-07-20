import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateProductResp, IProduct, IProductResp } from '../models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<IProductResp> {
    return this.http.get<IProductResp>(`${environment.apiUrl}/products`);
  }

  existProductByID(id: string): Observable<boolean>  {
    return this.http.get<boolean>(`${environment.apiUrl}/products/verification/${id}`);
  }

  createProduct(product: IProduct): Observable<ICreateProductResp> {
    return this.http.post<ICreateProductResp>(`${environment.apiUrl}/products`, product);
  }

}
