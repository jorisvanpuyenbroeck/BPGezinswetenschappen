import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';

@Component({
  selector: 'app-admin-examperiod-list',
  templateUrl: './examperiod-list.component.html',
  styleUrls: ['./examperiod-list.component.css'],
})
export class AdminExamperiodListComponent implements OnInit, OnDestroy {
  examperiods: ExamPeriod[] = [];
  examperiods$: Subscription = new Subscription();
  deleteExamperiod$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private examperiodService: ExamperiodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getExamPeriods();
  }

  ngOnDestroy(): void {
    this.examperiods$.unsubscribe();
    this.deleteExamperiod$.unsubscribe();
  }

  getExamPeriods() {
    this.examperiods$ = this.examperiodService.getExamPeriods().subscribe({
      next: (result) => (this.examperiods = result),
      error: (err) => (this.errorMessage = err.message),
    });
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
        next: () => this.getExamPeriods(),
        error: (e) => (this.errorMessage = e.message),
      });
  }
}
