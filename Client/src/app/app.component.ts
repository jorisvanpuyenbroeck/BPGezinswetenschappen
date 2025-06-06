import {
  Component,
  HostListener,
  signal,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from './user/role.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isAuthenticated = signal(false);
  isStudent = signal(false);
  isAdmin = signal(false);
  sidenavOpen = false;
  isMobile = false;
  title = 'mijnbachelorproef';
  private destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    public roleService: RoleService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
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
  ngOnInit(): void {
    // Monitor screen size changes
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: BreakpointState) => {
        // Check if we're at a small/medium screen size
        this.isMobile = result.matches;

        // Close the sidenav automatically when screen size becomes medium or smaller
        if (this.isMobile && this.sidenav && this.sidenav.opened) {
          this.sidenav.close();
          this.sidenavOpen = false;
        }

        // Reopen the sidenav when returning to larger screen if user is authenticated
        if (
          !this.isMobile &&
          this.isAuthenticated() &&
          this.sidenav &&
          !this.sidenav.opened
        ) {
          this.sidenav.open();
          this.sidenavOpen = true;
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
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
