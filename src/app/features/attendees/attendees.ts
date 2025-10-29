import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Button } from "@/app/shared/ui/button/button";

@Component({
  selector: 'app-attendees',
  imports: [MatSelectModule, MatInputModule, FormsModule, Button],
  templateUrl: './attendees.html',
  styleUrl: './attendees.css'
})
export class Attendees {
  selectedValue: string = "All";

}
