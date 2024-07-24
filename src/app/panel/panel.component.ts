import {ChangeDetectionStrategy, Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BudjetService } from '../services/budjet.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose, ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {

  @Output() webCostChange = new EventEmitter<number>();
  panelForm: FormGroup;
  budgetService = inject(BudjetService);

  constructor() {
    this.panelForm = new FormGroup({
      pages: new FormControl(1),
      languages: new FormControl(1)
    });

    this.panelForm.valueChanges.subscribe(() => {
      this.calculateWebCost();
    });
  }

  calculateWebCost(): void {
    const pages = this.panelForm.get('pages')?.value || 1;
    const languages = this.panelForm.get('languages')?.value || 1;
    const cost = this.budgetService.calculateWebCost(pages, languages);
    this.webCostChange.emit(cost);
  }

  increment(controlName: string): void {
    const control = this.panelForm.get(controlName) as FormControl;
    if (control) {
      control.setValue((control.value ?? 0) + 1);
      this.calculateWebCost();
    }
  }

  decrement(controlName: string): void {
    const control = this.panelForm.get(controlName) as FormControl;
    if (control && (control.value ?? 0) > 1) {
      control.setValue((control.value ?? 0) - 1);
      this.calculateWebCost();
    }
  }




  readonly dialog = inject(MatDialog);

  openDialog(title:string, text: string) {
    this.dialog.open(ModalComponent, {
      data: {title, text},
      
    });
  }
}

