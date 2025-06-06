import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-presentationday-list',
  templateUrl: './presentationday-list.component.html',
  styleUrls: ['./presentationday-list.component.css'],
})
export class PresentationdayListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'presentationDayId',
    'date',
    'examPeriod',
    'year',
    'actions',
  ];
  dataSource = new MatTableDataSource<PresentationDay>([]);
  presentationdays$: Subscription = new Subscription();
  deletePresentationday$: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private presentationdayService: PresentationdayService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPresentationDays();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.presentationdays$.unsubscribe();
    if (this.deletePresentationday$) {
      this.deletePresentationday$.unsubscribe();
    }
  }

  getPresentationDays() {
    this.presentationdays$ = this.presentationdayService
      .getPresentationDays()
      .subscribe({
        next: (result) => {
          this.dataSource.data = result;
        },
        error: (error) => {
          this.showNotification(
            'Error loading presentation days: ' + error.message,
            'error'
          );
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
    this.router.navigate(['admin/presentationday/form'], {
      state: { mode: 'add' },
    });
  }

  edit(id: number) {
    this.router.navigate(['admin/presentationday/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deletePresentationday$ = this.presentationdayService
      .deletePresentationDay(id)
      .subscribe({
        next: () => {
          this.getPresentationDays();
          this.showNotification(
            'Presentation day successfully deleted',
            'success'
          );
        },
        error: (error) => {
          this.showNotification(
            'Error deleting presentation day: ' + error.message,
            'error'
          );
        },
      });
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
