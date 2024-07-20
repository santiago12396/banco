import { TestBed } from '@angular/core/testing';

import { ProductValidService } from './product-valid.service';

describe('ProductValidService', () => {
  let service: ProductValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductValidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
