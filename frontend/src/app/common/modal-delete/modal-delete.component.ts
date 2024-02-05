import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // El usuario canceló la eliminación
  }

  onConfirmClick(): void {
    this.dialogRef.close(true); // El usuario confirmó la eliminación
  }
}
