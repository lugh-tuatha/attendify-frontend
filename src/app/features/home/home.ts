import { Component } from '@angular/core';
import { Trustbox } from "@/app/shared/components/trustbox/trustbox";
import { MatButtonModule } from '@angular/material/button';
import { FeatureCard } from "@/app/shared/components/feature-card/feature-card";

@Component({
  selector: 'app-home',
  imports: [
    Trustbox,
    MatButtonModule,
    FeatureCard
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
