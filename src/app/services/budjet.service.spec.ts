import { TestBed } from '@angular/core/testing';
import { BudjetService } from './budjet.service';

describe('BudjetService', () => {
  let service: BudjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudjetService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for 1 page and 1 language', () => {
    const cost = service.calculateWebCost(1, 1);
    expect(cost).toBe(0);
  });


  it('should calculate correct cost for single page and multiple languages', () => {
    const cost = service.calculateWebCost(1, 3);
    expect(cost).toBe(60);
  });

  it('should calculate correct cost for multiple pages and single language', () => {
    const cost = service.calculateWebCost(4, 1);
    expect(cost).toBe(90);
  });
});
