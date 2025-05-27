import { Component, OnInit, OnDestroy } from '@angular/core';
import { Year } from '../../../../shared/models/year';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { YearService } from '../../../../shared/services/year.service';

@Component({
  selector: 'app-admin-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css'],
})
export class AdminYearListComponent implements OnInit, OnDestroy {
  years: Year[] = [];
  years$: Subscription = new Subscription();
  deleteYear$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private yearService: YearService, private router: Router) {}

  ngOnInit(): void {
    this.getYears();
  }

  ngOnDestroy(): void {
    this.years$.unsubscribe();
    this.deleteYear$.unsubscribe();
  }

  getYears() {
    this.years$ = this.yearService.getYears().subscribe({
      next: (result) => (this.years = result),
      error: (err) => (this.errorMessage = err.message),
    });
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
      next: () => this.getYears(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
