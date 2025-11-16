import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [
    MatButtonModule,
    MatDialogContent
  ],
  templateUrl: './delete-confirmation-modal.html',
  styleUrl: './delete-confirmation-modal.css'
})
export class DeleteConfirmationModal {
  private dialogRef = inject(MatDialogRef<DeleteConfirmationModal>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
