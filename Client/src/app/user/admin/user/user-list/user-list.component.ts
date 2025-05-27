import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  users$: Subscription = new Subscription();
  deleteUser$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.deleteUser$.unsubscribe();
  }

  async getUsers() {
    try {
      const result = await this.userService.getUsers().toPromise();
      this.users = result || [];
      console.log('users in list:', this.users); // Log after the array is updated
    } catch (err) {
      this.errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
    }
  }

  add() {
    this.router.navigate(['admin/user/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/user/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteUser$ = this.userService.deleteUser(id).subscribe({
      next: () => this.getUsers(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
