import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Year } from '../../../../shared/models/year';
import { YearService } from '../../../../shared/services/year.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-year-form',
  templateUrl: './year-form.component.html',
  styleUrls: ['./year-form.component.css'],
})
export class AdminYearFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  yearId: number = 0;
  year: Year = { yearId: 0, label: '', examPeriods: [] };
  isSubmitted: boolean = false;
  errorMessage: string = '';
  year$: Subscription = new Subscription();
  postYear$: Subscription = new Subscription();
  putYear$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private yearService: YearService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.yearId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    if (this.isEdit && this.yearId) {
      this.year$ = this.yearService.getYear(this.yearId).subscribe({
        next: (result) => (this.year = result),
        error: (err) => (this.errorMessage = err.message),
      });
    }
  }

  ngOnDestroy(): void {
    this.year$.unsubscribe();
    this.postYear$.unsubscribe();
    this.putYear$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postYear$ = this.yearService.createYear(this.year).subscribe({
        next: () => this.location.back(),
        error: (err) => (this.errorMessage = err.message),
      });
    } else if (this.isEdit) {
      this.putYear$ = this.yearService
        .updateYear(this.yearId, this.year)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }
}
