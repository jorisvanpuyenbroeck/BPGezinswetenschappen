import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-examperiod-list',
  templateUrl: './examperiod-list.component.html',
  styleUrls: ['./examperiod-list.component.css'],
})
export class AdminExamperiodListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ['examPeriodId', 'name', 'year', 'actions'];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<ExamPeriod>([]);

  examperiods$: Subscription = new Subscription();
  deleteExamperiod$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private examperiodService: ExamperiodService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getExamPeriods();
  }

  ngOnDestroy(): void {
    this.examperiods$.unsubscribe();
    if (this.deleteExamperiod$) {
      this.deleteExamperiod$.unsubscribe();
    }
  }

  getExamPeriods() {
    this.examperiods$ = this.examperiodService.getExamPeriods().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification('Error loading exam periods: ' + error.message, 'Close');
      },
    });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/examperiod/form'], { state: { mode: 'add' } });
  }

  onEdit(examperiod: ExamPeriod) {
    this.router.navigate(['admin/examperiod/form'], {
      state: { id: examperiod.examPeriodId, mode: 'edit' },
    });
  }

  onDelete(examperiod: ExamPeriod) {
    this.deleteExamperiod$ = this.examperiodService
      .deleteExamPeriod(examperiod.examPeriodId)
      .subscribe({
        next: () => {
          this.getExamPeriods();
          this.showNotification('Exam period successfully deleted', 'Close');
        },
        error: (error) => {
          this.showNotification('Error deleting exam period: ' + error.message, 'Close');
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
