import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-presentationday-list',
  templateUrl: './presentationday-list.component.html',
  styleUrls: ['./presentationday-list.component.css'],
})
export class AdminPresentationdayListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'presentationDayId',
    'date',
    'examPeriod',
    'year',
    'actions',
  ];
  hideableColumns: string[] = ['year']; // Hide year column on small screens as it's related to examPeriod
  dataSource = new MatTableDataSource<PresentationDay>([]);

  presentationdays$: Subscription = new Subscription();
  deletePresentationday$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private presentationdayService: PresentationdayService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPresentationDays();
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
            'Close'
          );
        },
      });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/presentationday/form'], {
      state: { mode: 'add' },
    });
  }

  onEdit(presentationday: PresentationDay) {
    this.router.navigate(['admin/presentationday/form'], {
      state: { id: presentationday.presentationDayId, mode: 'edit' },
    });
  }

  onDelete(presentationday: PresentationDay) {
    this.deletePresentationday$ = this.presentationdayService
      .deletePresentationDay(presentationday.presentationDayId)
      .subscribe({
        next: () => {
          this.getPresentationDays();
          this.showNotification(
            'Presentation day successfully deleted',
            'Close'
          );
        },
        error: (error) => {
          this.showNotification(
            'Error deleting presentation day: ' + error.message,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
