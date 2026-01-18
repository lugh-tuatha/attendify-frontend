import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FileText, LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-report-item-card',
  imports: [
    LucideAngularModule, 
    NgClass
  ],
  templateUrl: './report-item-card.html',
  styleUrl: './report-item-card.css',
})
export class ReportItemCard {
  @Input({ required: true }) icon!: LucideIconData;
  @Input({ required: true }) iconBgClass!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input() isAvailable: boolean = true;
  @Input() href: string = 'reports';

  readonly FileText = FileText;
}
