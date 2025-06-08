import {
  Component,
  signal,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();

  user: User = {} as User;
  userSubscription: Subscription | undefined;
  hamburgerOpen = false;

  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isCoach = signal(false);
  isStudent = signal(false);
  isMentor = signal(false);

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.userStore$.subscribe((user) => {
      console.log('menu component initialized');
      // Update the local user property
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
  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  navigateTo(path: string) {
    this.hamburgerOpen = false;
    this.router.navigate([path]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
