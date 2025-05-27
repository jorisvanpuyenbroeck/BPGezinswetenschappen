import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from "../../../user/user.service";
import {first, reduce, take} from "rxjs";


@Component({
  selector: 'app-signup-button',
  templateUrl: './signup-button.component.html',
  styleUrls: ['./signup-button.component.css']
})
export class SignupButtonComponent {
  constructor(private auth: AuthService ) {}

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: "signup",
      },
    });
  }

  // handleAuthCallback(): void {
  //   this.auth.student$.subscribe(student => {
  //     if (student && student.sub) {
  //       this.userService.userExists(student.sub).subscribe(exists => {
  //         if (!exists) {
  //           this.userService.createUser(student).subscribe();
  //         }
  //       });
  //     }
  //   });
  // }

  // handleAuthCallback(): void {
  //   this.auth.handleRedirectCallback().subscribe(result => {
  //     if (result && result.appState && result.appState.target) {
  //       this.auth.student$.subscribe(student => {
  //         if (student && student.sub) {
  //           this.userService.userExists(student.sub).subscribe(exists => {
  //             if (!exists) {
  //               this.userService.createUser(student).subscribe();
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

}
