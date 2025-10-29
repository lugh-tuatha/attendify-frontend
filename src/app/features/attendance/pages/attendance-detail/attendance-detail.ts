import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Button } from '@/app/shared/ui/button/button'; 
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttendanceService } from '../../../../core/attendance/services/attendance';
import { CornerDownLeft, LucideAngularModule } from 'lucide-angular';
import { StatCard } from '@/app/shared/components/stat-card/stat-card';

const moment = _rollupMoment || _moment;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-attendance-detail',
  imports: [
    RouterLink,
    Button, 
    StatCard,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    LucideAngularModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './attendance-detail.html',
  styleUrl: './attendance-detail.css'
})
export class AttendanceDetail {
  readonly CornerDownLeft = CornerDownLeft;

  private route = inject(ActivatedRoute);
  private attendanceService = inject(AttendanceService);

  displayedColumns: string[] = ['fullName', 'primaryLeader', 'churchProcess', 'memberStatus', 'arival'];
  attendanceDataSource = new MatTableDataSource<any>([]);
  readonly date = new FormControl(moment());

  isAttendanceRecordLoading = false;
  
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (!slug) return;
    this.loadAttendanceRecord('93959e73-cfb0-447a-b5d7-fe8569e6f633', slug, '2025-10-19')
  }

  private loadAttendanceRecord(organizationId: string, slug: string, date: string, searchTerm?: string): void {
    this.isAttendanceRecordLoading = true;

    this.attendanceService.getAttendanceRecord(organizationId, slug, date, searchTerm).subscribe({
      next: (response) => {
        this.attendanceDataSource.data = response.data.data;
        this.isAttendanceRecordLoading = false;
        console.log(response)
      },
      error: (error) => {
        console.error('Error loading attendance record:', error);
        this.isAttendanceRecordLoading = false;
      }
    })

  }
}
