import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductValidService } from './product-valid.service';

describe('ProductValidService', () => {
  let service: ProductValidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductValidService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
