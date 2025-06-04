import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { YearService } from '../../../../shared/services/year.service';
import { Year } from '../../../../shared/models/year';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-examperiod-form',
  templateUrl: './examperiod-form.component.html',
  styleUrls: ['./examperiod-form.component.css'],
})
export class AdminExamperiodFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  examPeriodId: number = 0;
  examPeriod: ExamPeriod = {
    examPeriodId: 0,
    name: '',
    yearId: 0,
    year: null,
    presentationDays: [],
  };
  years: Year[] = [];
  isSubmitted: boolean = false;
  errorMessage: string = '';
  examPeriod$: Subscription = new Subscription();
  postExamPeriod$: Subscription = new Subscription();
  putExamPeriod$: Subscription = new Subscription();
  years$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private examperiodService: ExamperiodService,
    private yearService: YearService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.examPeriodId =
      +this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    this.years$ = this.yearService.getYears().subscribe({
      next: (result) => (this.years = result),
      error: (err) => (this.errorMessage = err.message),
    });
    if (this.isEdit && this.examPeriodId) {
      this.examPeriod$ = this.examperiodService
        .getExamPeriod(this.examPeriodId)
        .subscribe({
          next: (result) => (this.examPeriod = result),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  ngOnDestroy(): void {
    this.examPeriod$.unsubscribe();
    this.postExamPeriod$.unsubscribe();
    this.putExamPeriod$.unsubscribe();
    this.years$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postExamPeriod$ = this.examperiodService
        .createExamPeriod(this.examPeriod)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    } else if (this.isEdit) {
      this.putExamPeriod$ = this.examperiodService
        .updateExamPeriod(this.examPeriodId, this.examPeriod)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
