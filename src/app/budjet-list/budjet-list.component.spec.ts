import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudjetListComponent } from './budjet-list.component';

describe('BudjetListComponent', () => {
  let component: BudjetListComponent;
  let fixture: ComponentFixture<BudjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudjetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
