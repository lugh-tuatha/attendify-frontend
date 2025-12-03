import { Component } from '@angular/core';
import { Carousel } from "@/app/shared/components/carousel/carousel";
import { MatButtonModule } from "@angular/material/button";
import { BookOpen, Crown, FileText, LucideAngularModule, UserPlus } from "lucide-angular";
import { RouterLink } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-about',
  imports: [
    Carousel,
    LucideAngularModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  readonly UserPlus = UserPlus;
  readonly FileText = FileText;
  readonly Crown = Crown;
  readonly BookOpen = BookOpen;

  lastSunday: string | null = null;

  ngOnInit(): void {
    const lastSunday = moment().day(0);
    this.lastSunday = lastSunday.format('YYYY-MM-DD');
  }
  
  carouselImages = [
    {
      imageSrc: '/assets/carousel/image-1.jpeg',
      imageAlt: 'Image 1'
    },
    {
      imageSrc: '/assets/carousel/image-2.jpeg',
      imageAlt: 'Image 2'
    },
  ]
}
