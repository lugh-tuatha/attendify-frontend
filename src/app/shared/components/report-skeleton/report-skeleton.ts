import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-report-skeleton',
  imports: [],
  templateUrl: './report-skeleton.html',
  styleUrl: './report-skeleton.css'
})
export class ReportSkeleton {
  @HostBinding('style.display') display = 'contents';
}
