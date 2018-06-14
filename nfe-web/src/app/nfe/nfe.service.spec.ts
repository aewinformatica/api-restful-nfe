import { TestBed, inject } from '@angular/core/testing';

import { NfeService } from './nfe.service';

describe('NfeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NfeService]
    });
  });

  it('should be created', inject([NfeService], (service: NfeService) => {
    expect(service).toBeTruthy();
  }));
});
