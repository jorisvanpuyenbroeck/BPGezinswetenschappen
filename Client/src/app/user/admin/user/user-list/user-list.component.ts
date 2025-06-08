import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'userId',
    'userName',
    'givenName',
    'familyName',
    'userLevel',
    'actions',
  ];
  hideableColumns: string[] = ['givenName', 'familyName']; // Hide these columns on small screens
  dataSource = new MatTableDataSource<User>([]);

  users$: Subscription = new Subscription();
  deleteUser$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    if (this.deleteUser$) {
      this.deleteUser$.unsubscribe();
    }
  }

  async getUsers() {
    try {
      const result = await this.userService.getUsers().toPromise();
      this.dataSource.data = result || [];
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'An unknown error occurred';
      this.showNotification('Error loading users: ' + errorMsg, 'Close');
    }
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/user/form'], { state: { mode: 'add' } });
  }

  onEdit(user: User) {
    this.router.navigate(['admin/user/form'], {
      state: { id: user.userId, mode: 'edit' },
    });
  }

  onDelete(user: User) {
    if (!user.userId) {
      this.showNotification('Cannot delete user: Invalid user ID', 'Close');
      return;
    }

    this.deleteUser$ = this.userService.deleteUser(user.userId).subscribe({
      next: () => {
        this.getUsers();
        this.showNotification('User successfully deleted', 'Close');
      },
      error: (error) => {
        this.showNotification('Error deleting user: ' + error.message, 'Close');
      },
    });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
