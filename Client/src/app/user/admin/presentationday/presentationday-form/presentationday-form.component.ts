import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { Location } from '@angular/common';

@Component({
  selector: 'app-presentationday-form',
  templateUrl: './presentationday-form.component.html',
  styleUrls: ['./presentationday-form.component.css'],
})
export class PresentationdayFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  presentationDayId: number = 0;
  presentationDay: PresentationDay = {
    presentationDayId: 0,
    date: '',
    examPeriodId: 0,
    examPeriod: null,
    slots: [],
  };
  examPeriods: ExamPeriod[] = [];
  isSubmitted: boolean = false;
  errorMessage: string = '';
  presentationDay$: Subscription = new Subscription();
  postPresentationDay$: Subscription = new Subscription();
  putPresentationDay$: Subscription = new Subscription();
  examPeriods$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private presentationdayService: PresentationdayService,
    private examperiodService: ExamperiodService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.presentationDayId =
      +this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    this.examPeriods$ = this.examperiodService.getExamPeriods().subscribe({
      next: (result) => (this.examPeriods = result),
      error: (err) => (this.errorMessage = err.message),
    });
    if (this.isEdit && this.presentationDayId) {
      this.presentationDay$ = this.presentationdayService
        .getPresentationDay(this.presentationDayId)
        .subscribe({
          next: (result) => (this.presentationDay = result),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  ngOnDestroy(): void {
    this.presentationDay$.unsubscribe();
    this.postPresentationDay$.unsubscribe();
    this.putPresentationDay$.unsubscribe();
    this.examPeriods$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postPresentationDay$ = this.presentationdayService
        .createPresentationDay(this.presentationDay)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    } else if (this.isEdit) {
      this.putPresentationDay$ = this.presentationdayService
        .updatePresentationDay(this.presentationDayId, this.presentationDay)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }
}
