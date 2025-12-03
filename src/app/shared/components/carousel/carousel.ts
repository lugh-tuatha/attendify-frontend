import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

interface CarouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  imports: [
    NgClass,
    LucideAngularModule,
  ],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})

export class Carousel {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  @Input() images: CarouselImage[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoSlide: boolean = false;
  @Input() slideInterval: number = 5000;

  selectedIndex = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideCarousel();
    }
  }

  autoSlideCarousel(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
