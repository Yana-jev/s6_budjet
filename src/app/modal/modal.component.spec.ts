import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, MatDialogModule, ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        MatDialog,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});