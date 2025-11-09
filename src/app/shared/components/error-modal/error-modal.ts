import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { Button } from "../../ui/button/button";

@Component({
  selector: 'app-error-modal',
  imports: [Button, MatDialogContent],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css'
})
export class ErrorModal {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; image: string },
    private dialogRef: MatDialogRef<ErrorModal>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
