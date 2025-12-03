import { Component, Input } from '@angular/core';
import { Loader, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-button',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly Loader = Loader;

  @Input() loading = false;
  @Input() disabled = false;
}
