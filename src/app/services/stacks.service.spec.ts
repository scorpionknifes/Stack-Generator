import { TestBed } from '@angular/core/testing';

import { StacksService } from './stacks.service';

describe('StacksService', () => {
  let service: StacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StacksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
