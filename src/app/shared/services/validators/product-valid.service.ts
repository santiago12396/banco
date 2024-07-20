import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { ProductService } from './../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductValidService {

  constructor(private productService: ProductService) { }

  idValidator(id?: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const idValue = control.value;

      if (id && idValue === id) return of(null);

      return this.productService.existProductByID(idValue).pipe(
        map(existProduct => existProduct ? { idExist: true } : null)
      );
    };
  }

}

