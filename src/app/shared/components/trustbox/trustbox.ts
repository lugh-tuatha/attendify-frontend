import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trustbox',
  imports: [],
  templateUrl: './trustbox.html',
  styleUrl: './trustbox.css'
})
export class Trustbox implements OnInit {
  ngOnInit() {
    const trustboxRef = document.getElementById('trustbox');
    (window as any).Trustpilot.loadFromElement(trustboxRef);
  }
}
