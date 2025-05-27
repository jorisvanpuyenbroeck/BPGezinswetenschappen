import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { UserStore} from "../../../store/user-store";
import {UserService} from "../../../user/user.service";
import {Subscription} from "rxjs";
import {User} from "../../../shared/models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  user: User = {} as User;
  userSubscription: Subscription = new Subscription();

  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isCoach = signal(false);
  isStudent = signal(false);
  isMentor = signal(false);


  constructor(private userStore: UserStore, private userService: UserService) {

  }

  ngOnInit(): void {

    this.userSubscription = this.userService.userStore$.subscribe(user => {
      console.log("home component initialized");
      // Update the local student property
      this.user = user;
      if (user && user.sub) {
        this.userService.userExists(user.sub).subscribe(exists => {
          console.log('user exists:', exists)
          if (!exists) {
            this.userService.createUser(user).subscribe();
          }
        });
      }
    });
    this.isAuthenticated = this.userService.isAuthenticated;
    this.isAdmin = this.userService.isAdmin;
    this.isCoach = this.userService.isCoach;
    this.isStudent = this.userService.isStudent;
    this.isMentor = this.userService.isMentor;

  }


}
