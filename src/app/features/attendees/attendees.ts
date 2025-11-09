import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Button } from "@/app/shared/ui/button/button";
import { AttendeesService } from '@/app/core/attendees/services/attendees';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { SquarePen, LucideAngularModule, Trash, SearchCheck, EllipsisVertical } from 'lucide-angular';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditAttendeeDialog } from './components/edit-attendee-dialog/edit-attendee-dialog';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterAttendeeDto } from '@/app/core/events/dto/register-attendee.dto';
import { EventsService } from '@/app/core/events/services/events';
import { ErrorHandlerService } from '@/app/core/services/error-handler';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-attendees',
  imports: [
    MatSelectModule,
    MatInputModule,
    FormsModule,
    Button,
    CdkTableModule,
    LucideAngularModule,
    MatPaginator,
    MatMenuModule,
    RouterLink
],
  templateUrl: './attendees.html',
  styleUrl: './attendees.css'
})
export class Attendees {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private destroy$ = new Subject<void>();

  readonly SquarePen = SquarePen; 
  readonly Trash = Trash; 
  readonly SearchCheck = SearchCheck;
  readonly EllipsisVertical = EllipsisVertical;

  private readonly organizationId = '9d9f4139-ac7d-4aa6-a2ef-bcb941e3ea96';
  private attendeesService = inject(AttendeesService);
  private eventsService = inject(EventsService);
  private errorHandlerService = inject(ErrorHandlerService);

  dialog = inject(MatDialog);
  breakpointObserver = inject(BreakpointObserver);

  allColumns = ['profile', 'fullName', 'age', 'status', 'memberStatus', 'churchHierarchy', 'primaryLeader', 'churchProcess', 'network', 'actions'];
  displayedColumns: string[] = this.allColumns;
  attendeesDataSource = new MatTableDataSource<any>([]);
  attendees = {
    totalCount: 0,
    loading: false,
    errorMessage: null,
  }

  selectedValue: string = "All";
  currentSearchTerm: string | undefined = undefined;

  currentPage = 1;
  pageLimit = 10;  

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // This is a common breakpoint for phones
      Breakpoints.Small
    ]).subscribe(result => {
      
      if (result.matches) {
        this.displayedColumns = [
          'profile', 
          'fullName', 
          'memberStatus',
          'churchHierarchy',
          'actions'
        ];
      } else {
        this.displayedColumns = this.allColumns;
      }
    });

    this.loadAttendees();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAttendees(
    page: number = 1, 
    limit: number = 10, 
    searchTerm?: string, 
    forceRefresh: boolean = false
  ): void {
    this.attendees.loading = true;
    this.attendees.errorMessage = null; 

    this.attendeesService.getAttendees(this.organizationId, page, limit, searchTerm, forceRefresh).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.attendeesDataSource.data = response.data;
        this.attendees.totalCount = response.meta.total;
        this.attendees.loading = false;

        this.attendeesService.prefetchNextPage(
          this.organizationId,
          this.currentPage,
          this.pageLimit,
          this.attendees.totalCount,
          this.currentSearchTerm
        );
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
        this.attendees.loading = false;
        this.attendees.errorMessage = error?.error?.message ?? 'An unknown error occurred.';
        this.attendees.totalCount = 0;
        this.attendeesDataSource.data = [];
      }
    })
  }

  editAttendee(attendeeId: string) {
    const dialogRef = this.dialog.open(EditAttendeeDialog, {
      data: { attendeeId }
    })

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.loadAttendees(1, this.pageLimit, this.currentSearchTerm, true);
      }
    })
  }

  registerAttendee(attendeeId: string, eventId: string) {
    const dto: RegisterAttendeeDto = {
      eventId: eventId,
      attendeeId: attendeeId,
    }

    this.eventsService.registerAttendee(dto).subscribe({
      next: (response) => {
        console.log('Registered', response);
        this.errorHandlerService.showErrorModal(response.statusCode, `Attendee Successfully Registered`);
      },
      error: (err) => {
        const status = err.status;
        console.log(err)
        if (status === 409 || status === 502) {
          this.errorHandlerService.showErrorModal(status, err.error?.message);
        } else { 
          console.error('Registration failed', err)
        }
      }
    })
  }

  onSearchAttendeesRecord(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm === this.currentSearchTerm) return;
    this.currentSearchTerm = searchTerm ? searchTerm : undefined;

    if (this.paginator && this.paginator.pageIndex !== 0) {
      this.paginator.firstPage();
    }else {
      this.loadAttendees(1, this.pageLimit, searchTerm ? searchTerm : undefined);
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageLimit = event.pageSize;
    this.loadAttendees(this.currentPage, this.pageLimit, this.currentSearchTerm)
  }
}