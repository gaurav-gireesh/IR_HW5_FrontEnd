import { TestBed, inject } from '@angular/core/testing';

import { SuggestorService } from './suggestor.service';

describe('SuggestorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestorService]
    });
  });

  it('should be created', inject([SuggestorService], (service: SuggestorService) => {
    expect(service).toBeTruthy();
  }));
});
