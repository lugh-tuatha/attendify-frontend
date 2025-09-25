import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { RegisterAttendeeDto } from '../../models/register-attendee.dto';
import { Button } from '../../../../shared/ui/button/button';
import { EventsService } from '../../services/events';
import { EventModel } from '../../models/event.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-registration',
  imports: [Button, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatIconModule],
  templateUrl: './event-registration.html',
  styleUrl: './event-registration.css'
})
export class EventRegistration {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  event: EventModel | null = null;
  isEventLoading = false;
  
  memberStatusOptions: string[] = [];
  vipStatuses = ['First Timer', 'Second Timer', 'Third Timer', 'Fourth Timer'];
  nonVipStatuses = ['Regular Attendee', 'Regular Disciple', 'Regular Start Up', 'Back to Life', 'Children'];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    primaryLeader: ['', Validators.required],
    churchHierarchy: ['', Validators.required],
    memberStatus: ['', Validators.required],
  });

  ngOnInit(): void {
      const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId != null) {
      this.loadEvent(eventId);
    };

    this.form.get('churchHierarchy')?.valueChanges.subscribe((value) => {
      if (value === 'VIP') {
        this.memberStatusOptions = this.vipStatuses;
      } else {
        this.memberStatusOptions = this.nonVipStatuses;
      }
    });
  }

  private loadEvent(id: string): void {
    this.isEventLoading = true;

    this.eventsService.getEventById(id).subscribe({
      next: (response) => { 
        this.event = response.data;
        this.isEventLoading = false;
        console.log(this.event)
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.isEventLoading = false;
      }
    })
  }
  
  register() {
    const dto: RegisterAttendeeDto = {
      "eventId": this.event?.id!,
      "firstName": this.form.value.firstName!,
      "lastName": this.form.value.lastName!,
      "primaryLeader": this.form.value.primaryLeader!,
      "churchHierarchy": this.form.value.churchHierarchy!,
      "memberStatus": this.form.value.memberStatus!,
    };

    this.eventsService.registerAttendee(dto).subscribe({
      next: (response) => {
        console.log('Registered', response);
        this.openSnackBar();
      },
      error: (err) => console.error('Registration failed', err)
    });
  }

  openSnackBar() {
    this._snackBar.open('Registered Successfully', 'Splash', {
      duration: 5 * 1000,
    });
  }
}
