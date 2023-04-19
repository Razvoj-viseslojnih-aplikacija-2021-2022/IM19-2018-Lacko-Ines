import { TestBed } from '@angular/core/testing';

import { ProizvodjacService } from './proizvodjac.service';

describe('ProizvodjacService', () => {
  let service: ProizvodjacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodjacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
