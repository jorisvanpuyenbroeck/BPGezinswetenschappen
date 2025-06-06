import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-examperiod-list',
  templateUrl: './examperiod-list.component.html',
  styleUrls: ['./examperiod-list.component.css'],
})
export class AdminExamperiodListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['examPeriodId', 'name', 'year', 'actions'];
  dataSource = new MatTableDataSource<ExamPeriod>([]);
  examperiods$: Subscription = new Subscription();
  deleteExamperiod$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examperiodService: ExamperiodService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getExamPeriods();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.showNotification(
          'Error loading exam periods: ' + error.message,
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
    this.router.navigate(['admin/examperiod/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/examperiod/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteExamperiod$ = this.examperiodService
      .deleteExamPeriod(id)
      .subscribe({
        next: () => {
          this.getExamPeriods();
          this.showNotification('Exam period successfully deleted', 'success');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting exam period: ' + error.message,
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
