import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  user: User = {} as User;
  userSubscription: Subscription | undefined;

  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isCoach = signal(false);
  isStudent = signal(false);
  isMentor = signal(false);

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.userStore$.subscribe((user) => {
      this.user = user;
    });

    this.isAuthenticated = this.userService.isAuthenticated;
    this.isAdmin = this.userService.isAdmin;
    this.isCoach = this.userService.isCoach;
    this.isStudent = this.userService.isStudent;
    this.isMentor = this.userService.isMentor;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
