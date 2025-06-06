import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class AdminUserListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = [
    'userId',
    'userName',
    'givenName',
    'familyName',
    'userLevel',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);
  users$: Subscription = new Subscription();
  deleteUser$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.deleteUser$.unsubscribe();
  }

  async getUsers() {
    try {
      const result = await this.userService.getUsers().toPromise();
      this.dataSource.data = result || [];
      console.log('users in list:', result); // Log after the array is updated
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'An unknown error occurred';
      this.errorMessage = errorMsg;
      this.showNotification('Error loading users: ' + errorMsg, 'error');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
      next: () => {
        this.getUsers();
        this.showNotification('User successfully deleted', 'success');
      },
      error: (e) => {
        this.errorMessage = e.message;
        this.showNotification('Error deleting user: ' + e.message, 'error');
      },
    });
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass:
        action === 'error' ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
