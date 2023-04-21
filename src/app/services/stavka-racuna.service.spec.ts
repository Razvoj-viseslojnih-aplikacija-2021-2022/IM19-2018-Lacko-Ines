import { TestBed } from '@angular/core/testing';

import { StavkaRacunaService } from './stavka-racuna.service';

describe('StavkaRacunaService', () => {
  let service: StavkaRacunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StavkaRacunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
