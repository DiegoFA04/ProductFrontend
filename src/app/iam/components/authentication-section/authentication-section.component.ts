import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './authentication-section.component.html',
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {
  currentUsername: string = '';
  isSignedIn: boolean = false;
  constructor(private router: Router, private authenticationService: AuthenticationService)  {
    this.authenticationService.currentUsername.subscribe((username) => {
      this.currentUsername = username;
    });
    this.authenticationService.isSignedIn.subscribe((isSignedIn) => {
      this.isSignedIn = isSignedIn;
    });
  }

  onSignIn() {
    this.router.navigate(['/sign-in']).then();
  }

  onSignUp() {
    this.router.navigate(['/sign-up']).then();
  }

  onSignOut() {
    this.authenticationService.signOut();
  }

}
