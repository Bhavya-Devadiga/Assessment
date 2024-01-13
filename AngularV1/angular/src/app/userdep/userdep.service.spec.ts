import { TestBed } from '@angular/core/testing';

import { UserdepService } from './userdep.service';

describe('UserdepService', () => {
  let service: UserdepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
