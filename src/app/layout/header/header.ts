import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ClerkService, ClerkUserButtonComponent } from '@jsrob/ngx-clerk';
import { CalendarFold, CalendarSync, FileText, Info, LayoutDashboard, LucideAngularModule, Menu, Users } from 'lucide-angular';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, 
    ClerkUserButtonComponent,
    LucideAngularModule,
    MatButton
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {
  readonly Menu = Menu;
  readonly Info = Info;
  readonly LayoutDashboard = LayoutDashboard
  readonly Users = Users;
  readonly CalendarFold = CalendarFold;
  readonly CalendarSync = CalendarSync;
  readonly FileText = FileText;

  clerkService = inject(ClerkService);
  isSignedIn = signal(false);

  isMenuOpen = signal(false);

  constructor() {
    const isClerkLoaded = this.clerkService.loaded();

    if (isClerkLoaded) {
      this.isSignedIn.set(!!this.clerkService.user());
    }

    effect(() => {
      const user = this.clerkService.user();
      this.isSignedIn.set(!!user);
    });
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    console.log(this.isMenuOpen());
  }
}
