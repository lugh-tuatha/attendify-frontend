import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, CornerDownLeft, SearchCheck } from 'lucide-angular';

@Component({
  selector: 'app-search',
  imports: [LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  @Output() search = new EventEmitter<string>();
  readonly SearchCheck = SearchCheck;

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value.trim().toLowerCase());
  }
}
