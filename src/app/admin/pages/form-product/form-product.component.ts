import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { formatDateCurrent, getDateNextYear, getDateNextYearFromString } from '../../../shared/helpers/format-date';

import { ProductService } from './../../../shared/services/product.service';
import { ProductValidService } from './../../../shared/services/validators/product-valid.service';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { ICreateProductDTO, IProduct } from '../../../shared/models/product.model';

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

  @Input() id = '';

  form: FormGroup = this.formBuilder.group({
    ID: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    dateRelease: ['', [Validators.required]],
    dateRevision: ['', [Validators.required]]
  });


  formTitle = signal('');
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

  get isReadOnly(): boolean {
    return !!this.id;
  }

  ngOnInit(): void {
    this.currentDateFormatted.set(formatDateCurrent(this.currentDate()));
    this.id ? this.initialEditForm() : this.initialNewForm();
    this.detectChangesInForm();
  }


  initialNewForm() {
    this.formTitle.set('Registro');
    this.form.get('ID')?.setAsyncValidators(this.productValidService.idValidator());
    this.initialDate();
  }


  initialEditForm() {
    this.formTitle.set('Actualización');
    this.form.get('ID')?.setAsyncValidators(this.productValidService.idValidator(this.id));

    this.productService.getProductByID(this.id)
        .subscribe(product => {
          this.form.reset(
            {
              ...product,
              ID: product?.id,
              dateRelease: product?.date_release,
              dateRevision: product?.date_revision,
            }
          );
        });
  }

  detectChangesInForm(): void {
    this.form.get('dateRelease')?.valueChanges.subscribe(value => {
      if(value) {
        const dateNextYear = getDateNextYearFromString(value);
        this.form.get('dateRevision')?.setValue(dateNextYear);
      }
    });
  }


  initialDate() {
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
    this.form.reset({ ID: this.id });
  }

  createProduct({ name, description, logo, date_release, date_revision }: ICreateProductDTO) {
    this.productService.createProduct({ name, description, logo, date_release, date_revision })
    .subscribe({
      next: ()  => {
        this.router.navigateByUrl('/products');
      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }

  updateProduct({ id, name, description, logo, date_release, date_revision }: IProduct) {
    this.productService.updateProduct({ id, name, description, logo, date_release, date_revision })
    .subscribe({
      next: ()  => {
        this.router.navigateByUrl('/products');
      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }


  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { ID: id, name, description, logo, dateRelease: date_release, dateRevision: date_revision } = this.form.value;

    if(this.id) return this.updateProduct({ id, name, description, logo, date_release, date_revision });

    this.createProduct({ name, description, logo, date_release, date_revision });
  }
}
