import { TestBed } from '@angular/core/testing';

import { SneakersApiService } from './sneakers-api.service';

describe('SneakersApiService', () => {
  let service: SneakersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SneakersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
