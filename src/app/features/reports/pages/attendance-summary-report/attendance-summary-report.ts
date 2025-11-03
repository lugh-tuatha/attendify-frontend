import { Component } from '@angular/core';
import { Users, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-attendance-summary-report',
  imports: [LucideAngularModule],
  templateUrl: './attendance-summary-report.html',
  styleUrl: './attendance-summary-report.css'
})

export class AttendanceSummaryReport {
  readonly Users = Users;
}
