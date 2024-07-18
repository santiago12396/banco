import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductResp } from '../models/product.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<IProductResp> {
    return this.http.get<IProductResp>(`${environment.apiUrl}/products`);
  }

  // createBill(bill: IBill): Observable<IMessage> {
  //   return this.http.post<IMessage>(`${environment.apiUrl}/bills`, bill);
  // }

  // getBillById(id: string): Observable<IBill>  {
  //   return this.http.get<IBill>(`${environment.apiUrl}/bills/${id}`);
  // }

  // updateBill
}
