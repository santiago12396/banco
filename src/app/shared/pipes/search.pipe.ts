import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], searchTerm: string): IProduct[] {
    if (products.length === 0) return [];

    if (searchTerm.trim() === '') return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
