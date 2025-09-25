import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventModel } from '../../models/event.model';
import { EventsService } from '../../services/events';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { LTHMIProfile } from '../../models/registered-attendee.model';
import { Button } from "../../../../shared/ui/button/button";

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-event-detail',
  imports: [RouterLink, CdkTableModule, Button],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css'
})

export class EventDetail {
  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);

  event: EventModel | null = null;
  isEventLoading = false;

  registeredAttendeesColumns: string[] = ['fullName', 'primaryLeader', 'churchHierarchy','memberStatus', 'actions'];
  dataSource = new MatTableDataSource<LTHMIProfile>([]);
  isRegisteredAttendeesLoading = false;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId != null) {
      this.loadEvent(eventId);
      this.loadRegisteredAttendees(eventId);
    };
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

  private loadRegisteredAttendees(id: string): void {
    this.isRegisteredAttendeesLoading = true;

    this.eventsService.getAllRegisteredAttendees(id).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        console.log(this.dataSource.data)
      },
      error: (error) => {
        console.error('Error loading registered attendees:', error);
        this.isRegisteredAttendeesLoading = false;
      }
    })
  }
}
