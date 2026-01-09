import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { Church, LucideAngularModule, UserPlus } from "lucide-angular";
import { finalize } from 'rxjs';

import { AttendeeModel } from '@/app/features/attendees/models/attendee.model';
import { ChurchHierarchyEnum } from '@/app/core/enums/church-hierarchy.enum';
import { ChurchProcessEnum } from '@/app/core/enums/church-process.enum';
import { MemberStatusEnum } from '@/app/core/enums/member-status.enum';
import { NetworkEnum } from '@/app/core/enums/network.enum';
import { CivilStatusesEnum } from '@/app/core/enums/status.enum';
import { Organization, ORGANIZATIONS } from '@/app/core/constants/organizations';
import { environment } from '@/environments/environment';
import { AttendeesService } from '@/app/features/attendees/services/attendees';
import { ErrorHandlerService } from '@/app/core/services/error-handler';

@Component({
  selector: 'app-enroll-attendee',
  imports: [
    MatCardModule,
    LucideAngularModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './enroll-attendee.html',
  styleUrl: './enroll-attendee.css'
})

export class EnrollAttendee {
  readonly UserPlus = UserPlus;
  readonly Church = Church;

  readonly organizationId = environment.organizationId;
  organizations: Organization[] = ORGANIZATIONS;

  memberStatuses = Object.values(MemberStatusEnum);
  churchHierarchies = Object.values(ChurchHierarchyEnum);
  churchProcesses = Object.values(ChurchProcessEnum);
  networks = Object.values(NetworkEnum);
  civilStatuses = Object.values(CivilStatusesEnum);

  primaryLeadersList: AttendeeModel[] = [];

  private fb = inject(FormBuilder);
  private attendeesService = inject(AttendeesService);
  private errorHandlerService = inject(ErrorHandlerService);

  attendeeForm!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.attendeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÑñ\s\.]+$/)]],
      lastName: ['', Validators.pattern(/^[A-Za-zÑñ\s\.]+$/)],
      age: [null, [Validators.min(1), Validators.max(100)]],
      invitedBy: [null],
      status: [null],
      address: [null],
      memberStatus: [null],
      churchHierarchy: [null],
      churchProcess: [null],
      primaryLeaderId: [null],
      network: [null],
      organizationId: [this.organizationId, [Validators.required]],
    })

    this.loadPrimaryLeader()
  }

  onSubmit() {
    this.isSubmitting = true;

    const payload: AttendeeModel = {
      ...this.attendeeForm.value,
      organizationId: this.organizationId,
    }

    console.log(this.attendeeForm.value)

    this.attendeesService.createAttendee(payload).pipe(
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe({
      next: (response) => {
        console.log('Attendee created', response);
        this.attendeeForm.reset();
        this.errorHandlerService.showErrorModal(response.statusCode, `Attendee Successfully Enrolled`);
      },
      error: (error) => {
        console.error('Error creating attendee:', error);
        this.errorHandlerService.showErrorModal(error.status, error.error?.message);
      }
    })
  }

  loadPrimaryLeader() {
    this.attendeesService.getAttendeesByChurchHierarchy(['PRIMARY_LEADER', 'PASTOR']).subscribe({
      next: (response) => {
        console.log(response);
        this.primaryLeadersList = response.data;
      },
      error: (error) => {
        console.error('Error loading primary leaders:', error);
        this.errorHandlerService.showErrorModal(error.status, error.error?.message);
      }
    })
  }

  onSlide(value: any) {
    console.log("Slider:", value);
  }
}
