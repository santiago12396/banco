import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FormProductComponent } from './form-product.component';
import { ProductService } from '../../../shared/services/product.service';
import { ProductValidService } from '../../../shared/services/validators/product-valid.service';
import { ValidatorService } from '../../../shared/services/validators/validator.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { formatDateCurrent, getDateNextYear } from '../../../shared/helpers/format-date';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productService: ProductService;
  let productValidService: ProductValidService;
  let validatorService: ValidatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        DialogComponent,
        FormProductComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: ProductService,
          useValue: {
            getProductByID: jest.fn(),
            createProduct: jest.fn(),
            updateProduct: jest.fn()
          }
        },
        {
          provide: ProductValidService,
          useValue: {
            idValidator: jest.fn()
          }
        },
        {
          provide: ValidatorService,
          useValue: {
            isValidField: jest.fn(),
            getFieldError: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    validatorService = TestBed.inject(ValidatorService);
    productValidService = TestBed.inject(ProductValidService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    test('should initialize form for new product', () => {

      component.ngOnInit();

      expect(component.formTitle()).toBe('Registro');
      expect(component.form.get('dateRelease')?.value).toBe(formatDateCurrent(component.currentDate()));
      expect(component.form.get('dateRevision')?.value).toBe(formatDateCurrent(getDateNextYear(component.currentDate())));
    });

    test('should initialize form for editing product', () => {
      component.id = '1';
      const product = { id: '1', name: 'Product', description: 'Description', logo: 'logo.png', date_release: '2024-01-01', date_revision: '2024-01-01' };

      jest.spyOn(productService, 'getProductByID').mockReturnValue(of(product));
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.form.get('ID')?.value).toBe(product.id);
      expect(component.form.get('name')?.value).toBe(product.name);
      expect(component.form.get('description')?.value).toBe(product.description);
      expect(component.form.get('logo')?.value).toBe(product.logo);
      expect(component.form.get('dateRelease')?.value).toBe(product.date_release);
      expect(component.form.get('dateRevision')?.value).toBe(product.date_revision);
    });
  });

  describe('form validation', () => {
    test('should invalid ID field when empty', () => {
      const idControl = component.form.get('ID');
      idControl?.setValue('');
      idControl?.markAsTouched();
      fixture.detectChanges();

      expect(idControl?.invalid).toBeTruthy();
      expect(idControl?.errors?.['required']).toBeTruthy();
    });

    test('should invalid ID field when short', () => {
      const idControl = component.form.get('ID');
      idControl?.setValue('ab');
      idControl?.markAsTouched();
      fixture.detectChanges();

      expect(idControl?.invalid).toBeTruthy();
      expect(idControl?.errors?.['minlength']).toBeTruthy();
    });

    test('should invalid ID field when long', () => {
      const idControl = component.form.get('ID');
      idControl?.setValue('a'.repeat(11));
      idControl?.markAsTouched();
      fixture.detectChanges();

      expect(idControl?.invalid).toBeTruthy();
      expect(idControl?.errors?.['maxlength']).toBeTruthy();
    });

    test('should valid ID field when correct', () => {
      const idControl = component.form.get('ID');
      idControl?.setValue('validID');
      idControl?.markAsTouched();
      fixture.detectChanges();

      expect(idControl?.valid).toBeTruthy();
    });

    test('should invalid name field when empty', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('');
      nameControl?.markAsTouched();
      fixture.detectChanges();

      expect(nameControl?.invalid).toBeTruthy();
      expect(nameControl?.errors?.['required']).toBeTruthy();
    });

    test('should invalid name field when short', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('shor');
      nameControl?.markAsTouched();
      fixture.detectChanges();

      expect(nameControl?.invalid).toBeTruthy();
      expect(nameControl?.errors?.['minlength']).toBeTruthy();
    });

    test('should invalid name field when long', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('a'.repeat(101));
      nameControl?.markAsTouched();
      fixture.detectChanges();

      expect(nameControl?.invalid).toBeTruthy();
      expect(nameControl?.errors?.['maxlength']).toBeTruthy();
    });

    test('should validate name field when correct', () => {
      const nameControl = component.form.get('name');
      nameControl?.setValue('Valid Product Name');
      nameControl?.markAsTouched();
      fixture.detectChanges();

      expect(nameControl?.valid).toBeTruthy();
    });

    test('should invalid description field when empty', () => {
      const descriptionControl = component.form.get('description');
      descriptionControl?.setValue('');
      descriptionControl?.markAsTouched();
      fixture.detectChanges();

      expect(descriptionControl?.invalid).toBeTruthy();
      expect(descriptionControl?.errors?.['required']).toBeTruthy();
    });

    test('should invalid description field when short', () => {
      const descriptionControl = component.form.get('description');
      descriptionControl?.setValue('shortdesc');
      descriptionControl?.markAsTouched();
      fixture.detectChanges();

      expect(descriptionControl?.invalid).toBeTruthy();
      expect(descriptionControl?.errors?.['minlength']).toBeTruthy();
    });

    test('should invalida description field when long', () => {
      const descriptionControl = component.form.get('description');
      descriptionControl?.setValue('a'.repeat(201));
      descriptionControl?.markAsTouched();
      fixture.detectChanges();

      expect(descriptionControl?.invalid).toBeTruthy();
      expect(descriptionControl?.errors?.['maxlength']).toBeTruthy();
    });

    test('should validate description field when correct', () => {
      const descriptionControl = component.form.get('description');
      descriptionControl?.setValue('Valid Product Description');
      descriptionControl?.markAsTouched();
      fixture.detectChanges();
      expect(descriptionControl?.valid).toBeTruthy();
    });

    test('should invalid logo field when empty', () => {
      const logoControl = component.form.get('logo');
      logoControl?.setValue('');
      logoControl?.markAsTouched();
      fixture.detectChanges();

      expect(logoControl?.invalid).toBeTruthy();
      expect(logoControl?.errors?.['required']).toBeTruthy();
    });

    test('should valid logo field when correct', () => {
      const logoControl = component.form.get('logo');
      logoControl?.setValue('http://example.com/logo.png');
      logoControl?.markAsTouched();
      fixture.detectChanges();

      expect(logoControl?.valid).toBeTruthy();
    });

    test('should valid dateRelease field when correct', () => {
      const dateReleaseControl = component.form.get('dateRelease');
      dateReleaseControl?.setValue('2024-01-01');
      dateReleaseControl?.markAsTouched();
      fixture.detectChanges();

      expect(dateReleaseControl?.valid).toBeTruthy();
    });

    test('should valid dateRevision field when correct', () => {
      const dateRevisionControl = component.form.get('dateRevision');
      dateRevisionControl?.setValue('2025-01-01');
      dateRevisionControl?.markAsTouched();
      fixture.detectChanges();

      expect(dateRevisionControl?.valid).toBeTruthy();
    });
  });

  describe('form actions', () => {
    test('should reset form', () => {
      component.handleResetForm();
      expect(component.form.get('ID')?.value).toBe(component.id);
    });
  });

});
