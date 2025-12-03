import { AttendeeModel } from '@/app/core/attendees/models/attendee.model';
import { AttendeesService } from '@/app/core/attendees/services/attendees';
import { ChurchHierarchyEnum } from '@/app/core/enums/church-hierarchy.enum';
import { ChurchProcessEnum } from '@/app/core/enums/church-process.enum';
import { MemberStatusEnum } from '@/app/core/enums/member-status.enum';
import { NetworkEnum } from '@/app/core/enums/network.enum';
import { CivilStatusesEnum } from '@/app/core/enums/status.enum';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-attendee-dialog',
  imports: [
    MatDialogContent,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
],
  templateUrl: './edit-attendee-dialog.html',
  styleUrl: './edit-attendee-dialog.css'
})
export class EditAttendeeDialog {
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<EditAttendeeDialog>);

  memberStatuses = Object.values(MemberStatusEnum);
  churchHierarchies = Object.values(ChurchHierarchyEnum);
  churchProcesses = Object.values(ChurchProcessEnum);
  networks = Object.values(NetworkEnum);
  civilStatuses = Object.values(CivilStatusesEnum);


  primaryLeadersList: AttendeeModel[] = [];

  private attendeesService = inject(AttendeesService);
  private fb = inject(FormBuilder);

  attendeeForm!: FormGroup;
  isAttendeeLoading = false;
  isSubmitting = false;

  ngOnInit(): void {
    this.attendeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÑñ\s\.]+$/)]],
      lastName: ['', Validators.pattern(/^[A-Za-zÑñ\s\.]+$/)],
      age: [null, [Validators.min(1), Validators.max(100)]],
      status: [''],
      address: [''],
      memberStatus: [''],
      churchHierarchy: [''],
      churchProcess: [''],
      primaryLeaderId: [''],
      network: [''],
    })

    this.loadAttendee();
    this.loadPrimaryLeader();
  }

  loadAttendee() {
    this.isAttendeeLoading = true;

    this.attendeesService.getAttendeeById(this.data.attendeeId).subscribe({
      next: (response) => {
        this.isAttendeeLoading = false;
        this.attendeeForm.patchValue(response.data)
      },
      error: (error) => {
        console.error('Error loading attendee:', error);
      }
    })
  }

  loadPrimaryLeader() {
    this.attendeesService.getAttendeesByChurchHierarchy(['PRIMARY_LEADER', 'PASTOR']).subscribe({
      next: (response) => {
        this.primaryLeadersList = response.data;
      },
      error: (error) => {
        console.error('Error loading primary leaders:', error);
      }
    })
  }

  onSubmit() {
    this.isSubmitting = true;
    const payload: AttendeeModel = {
      ...this.attendeeForm.value,
      age: this.attendeeForm.value.age
        ? Number(this.attendeeForm.value.age)
        : null,
    }
    
    this.attendeesService.updateAttendee(this.data.attendeeId, payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Attendee updated', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error updating attendee:', error);
      }
    })
  }

  close() {
    this.dialogRef.close(false);
  }
}
