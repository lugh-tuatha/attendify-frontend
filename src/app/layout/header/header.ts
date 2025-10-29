import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@/app/shared/ui/button/button'; 
import { ClerkService, ClerkSignInComponent, ClerkUserButtonComponent } from '@jsrob/ngx-clerk';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, 
    Button,
    ClerkUserButtonComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  clerkService = inject(ClerkService);
  isSignedIn = signal(false);

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
}
