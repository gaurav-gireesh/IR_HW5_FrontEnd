import { TestBed, inject } from '@angular/core/testing';

import { SpellCheckerService } from './spell-checker.service';

describe('SpellCheckerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpellCheckerService]
    });
  });

  it('should be created', inject([SpellCheckerService], (service: SpellCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
