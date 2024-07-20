import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ProductService } from './../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductValidService implements AsyncValidator {

  constructor(private productService: ProductService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const id = control.value;

    return this.productService.existProductByID(id)
              .pipe(
                map(existProduct => existProduct ? { idExist: true }: null)
              );
  }
}

