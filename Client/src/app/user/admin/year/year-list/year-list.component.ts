import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Year } from '../../../../shared/models/year';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { YearService } from '../../../../shared/services/year.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css'],
})
export class AdminYearListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ['yearId', 'label', 'actions'];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Year>([]);

  years$: Subscription = new Subscription();
  deleteYear$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private yearService: YearService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getYears();
  }

  ngOnDestroy(): void {
    this.years$.unsubscribe();
    if (this.deleteYear$) {
      this.deleteYear$.unsubscribe();
    }
  }

  getYears() {
    this.years$ = this.yearService.getYears().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification('Error loading years: ' + error.message, 'Close');
      },
    });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/year/form'], { state: { mode: 'add' } });
  }

  onEdit(year: Year) {
    this.router.navigate(['admin/year/form'], {
      state: { id: year.yearId, mode: 'edit' },
    });
  }

  onDelete(year: Year) {
    this.deleteYear$ = this.yearService.deleteYear(year.yearId).subscribe({
      next: () => {
        this.getYears();
        this.showNotification('Year successfully deleted', 'Close');
      },
      error: (error) => {
        this.showNotification('Error deleting year: ' + error.message, 'Close');
      },
    });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
