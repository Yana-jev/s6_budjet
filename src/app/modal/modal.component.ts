import {ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, text: string }) {}

  readonly dialog = Inject(MatDialog);

  openDialog(title:string, text: string) {
    this.dialog.open(ModalComponent, {
      data: {title, text},
      
    });
  }



}
