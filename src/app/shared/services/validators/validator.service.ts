import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  private getErrorMessage(errors: any): string | null {
    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${ errors['minlength']['requiredLength'] } caracteres`;
        case 'maxlength':
          return `Este campo debe tener como máximo ${ errors['maxlength']['requiredLength'] } caracteres`;
        case 'idExist':
          return 'Este ID ya se encuentra registrado';
      }
    }

    return null;
  }

  getFieldError( form: FormGroup, field: string ): string | null {
    if (!form.controls[field]) return null;
    const errors = form.controls[field].errors || {};
    return this.getErrorMessage(errors);
  }
}
