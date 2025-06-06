import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Year } from '../../../../shared/models/year';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { YearService } from '../../../../shared/services/year.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css'],
})
export class AdminYearListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = ['yearId', 'label', 'actions'];
  dataSource = new MatTableDataSource<Year>([]);
  years$: Subscription = new Subscription();
  deleteYear$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private yearService: YearService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getYears();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.years$.unsubscribe();
    this.deleteYear$.unsubscribe();
  }

  getYears() {
    this.years$ = this.yearService.getYears().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.showNotification('Error loading years: ' + err.message, 'error');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.router.navigate(['admin/year/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/year/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteYear$ = this.yearService.deleteYear(id).subscribe({
      next: () => {
        this.getYears();
        this.showNotification('Year successfully deleted', 'success');
      },
      error: (e) => {
        this.errorMessage = e.message;
        this.showNotification('Error deleting year: ' + e.message, 'error');
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
