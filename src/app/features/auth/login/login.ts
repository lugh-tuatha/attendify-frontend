import { Component } from '@angular/core';
import { ClerkSignInComponent } from "@jsrob/ngx-clerk";

@Component({
  selector: 'app-login',
  imports: [ClerkSignInComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
