import { TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
