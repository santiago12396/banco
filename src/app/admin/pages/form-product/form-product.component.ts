import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { formatDateCurrent, getDateNextYear, getDateNextYearFromString } from '../../../shared/helpers/format-date';

import { ProductService } from './../../../shared/services/product.service';
import { ProductValidService } from './../../../shared/services/validators/product-valid.service';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DialogComponent
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    ID: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.productValidService]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    dateRelease: ['', [Validators.required]],
    dateRevision: ['', [Validators.required]]
  });

  currentDate = signal(new Date);
  currentDateFormatted = signal('');

  isDialogOpen = signal(false);
  confirmedDialog = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService,
    private productValidService: ProductValidService,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.initialDate();

    this.form.get('dateRelease')?.valueChanges.subscribe(value => {
      if(value) {
        const dateNextYear = getDateNextYearFromString(value);
        this.form.get('dateRevision')?.setValue(dateNextYear);
      }
    });
  }

  initialDate() {
    this.currentDateFormatted.set(formatDateCurrent(this.currentDate()));
    this.form.get('dateRelease')?.setValue(formatDateCurrent(this.currentDate()));

    const dateNextYear = getDateNextYear(this.currentDate());

    this.form.get('dateRevision')?.setValue(formatDateCurrent(dateNextYear));
  }

  getIsValidField(field: string) {
    return this.validatorService.isValidField(this.form, field);
  }

  getFieldError(field: string) {
    return this.validatorService.getFieldError(this.form, field);
  }

  handleResetForm() {
    this.form.reset();
  }

  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { ID: id, name, description, logo, dateRelease: date_release, dateRevision: date_revision } = this.form.value;

    this.productService.createProduct({ id, name, description, logo, date_release, date_revision })
      .subscribe({
        next: ()  => {
          this.router.navigateByUrl('/products');
        },
        error: err => {
          console.error('Error:', err);
        }
      });
  }
}
