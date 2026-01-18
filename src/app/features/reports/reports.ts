import { Component } from '@angular/core';
import { Calendar, GraduationCap, LucideAngularModule, Shield, Star, UserCheck } from 'lucide-angular';
import { ReportItemCard } from "./components/report-item-card/report-item-card";

@Component({
  selector: 'app-reports',
  imports: [
    LucideAngularModule,
    ReportItemCard
],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  readonly UserCheck = UserCheck;
  readonly GraduationCap = GraduationCap;
  readonly Shield = Shield;
  readonly Calendar = Calendar;
}
