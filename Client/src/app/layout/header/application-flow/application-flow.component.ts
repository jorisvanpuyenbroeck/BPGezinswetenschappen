import {Component, OnInit} from '@angular/core';
import {Topic} from "../../../shared/models/topic";
import {User} from "../../../shared/models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../../user/user.service";

@Component({
  selector: 'app-application-flow',
  templateUrl: './application-flow.component.html',
  styleUrls: ['./application-flow.component.css']
})
export class ApplicationFlowComponent implements OnInit {

  // local
  user: User = {} as User;

  // Subscriptions
  userSubscription: Subscription = new Subscription();

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userStore$.subscribe(user => {
      console.log("application flow component initialized");
      // Update the local student property
      this.user = user;
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}
