import {Component, signal, OnInit, OnDestroy} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {User} from "../../../shared/models/user";
import {UserService} from "../../../user/user.service";



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  user: User = {} as User;
  userSubscription: any;
  hamburgerOpen = false;
  adminDropdownOpen = false;
  coachDropdownOpen = false;
  studentDropdownOpen = false;
  mentorDropdownOpen = false;

  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isCoach = signal(false);
  isStudent = signal(false);
  isMentor = signal(false);

  constructor(
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.userStore$.subscribe(user => {
      console.log("menu component initialized");
      // Update the local student property
      this.user = user;
    });
    this.isAuthenticated = this.userService.isAuthenticated;
    this.isAdmin = this.userService.isAdmin;
    this.isCoach = this.userService.isCoach;
    this.isStudent = this.userService.isStudent;
    this.isMentor = this.userService.isMentor;

  }

  ngOnDestroy(): void {
  }

  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

  onHamburgerItemClick() {
    if (this.hamburgerOpen) {
      this.hamburgerOpen = false;
    }
  }

  onAdminDropDownClick() {
    this.adminDropdownOpen = !this.adminDropdownOpen;
  }

  closeAdminDropDown() {
    this.adminDropdownOpen = false;
  }

  onCoachDropDownClick() {
    this.coachDropdownOpen = !this.coachDropdownOpen;
  }

  closeCoachDropDown() {
    this.coachDropdownOpen = false;
  }
  onMentorDropDownClick() {
    this.mentorDropdownOpen = !this.mentorDropdownOpen;
  }

  closeMentorDropDown() {
    this.mentorDropdownOpen = false;
  }

  onStudentDropDownClick() {
    this.studentDropdownOpen = !this.studentDropdownOpen;
  }

  closeStudentDropDown() {
    this.studentDropdownOpen = false;
  }

  navigateTo(path: string) {
    this.closeAdminDropDown();

    this.hamburgerOpen = false;
    this.router.navigate([path]);
  }

}
