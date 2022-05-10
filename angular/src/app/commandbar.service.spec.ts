import { TestBed } from '@angular/core/testing';

import { CommandbarService } from './commandbar.service';

describe('CommandbarService', () => {
  let service: CommandbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
