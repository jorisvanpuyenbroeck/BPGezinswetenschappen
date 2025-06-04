import {
  Component,
  HostListener,
  signal,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from './user/role.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isAuthenticated = signal(false);
  isStudent = signal(false);
  isAdmin = signal(false);
  sidenavOpen = false;
  title = 'mijnbachelorproef';
  constructor(
    public authService: AuthService,
    public roleService: RoleService,
    private router: Router
  ) {
    this.authService.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);

      // Auto-open sidenav for authenticated users
      if (auth) {
        this.sidenavOpen = true;
      }
    });
    this.roleService.hasPermission('isStudent').subscribe((student) => {
      this.isStudent.set(student);
    });
    this.roleService.hasPermission('isAdmin').subscribe((admin) => {
      this.isAdmin.set(admin);
    });
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(e: Event) {
  //   let element = document.getElementById('hero');
  //   if (element && window.pageYOffset > 0) {
  //     element.classList.add('hide');
  //   }
  // }
}
