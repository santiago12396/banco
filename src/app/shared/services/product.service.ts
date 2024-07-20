import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IAlterProductResp, IProduct, IProductResp } from '../models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<IProductResp> {
    return this.http.get<IProductResp>(`${environment.apiUrl}/products`);
  }

  getProductByID(id: string): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      map(resp => resp.data.find(product => product.id === id))
    );
  }

  existProductByID(id: string): Observable<boolean>  {
    return this.http.get<boolean>(`${environment.apiUrl}/products/verification/${id}`);
  }

  createProduct(product: IProduct): Observable<IAlterProductResp> {
    return this.http.post<IAlterProductResp>(`${environment.apiUrl}/products`, product);
  }

  updateProduct(product: IProduct): Observable<IAlterProductResp> {
    return this.http.put<IAlterProductResp>(`${environment.apiUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<IAlterProductResp> {
    return this.http.delete<IAlterProductResp>(`${environment.apiUrl}/products/${id}`);
  }

}
