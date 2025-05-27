import { Component, OnInit, OnDestroy } from '@angular/core';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';

@Component({
  selector: 'app-presentationday-list',
  templateUrl: './presentationday-list.component.html',
  styleUrls: ['./presentationday-list.component.css'],
})
export class PresentationdayListComponent implements OnInit, OnDestroy {
  presentationdays: PresentationDay[] = [];
  presentationdays$: Subscription = new Subscription();
  deletePresentationday$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private presentationdayService: PresentationdayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPresentationDays();
  }

  ngOnDestroy(): void {
    this.presentationdays$.unsubscribe();
    this.deletePresentationday$.unsubscribe();
  }

  getPresentationDays() {
    this.presentationdays$ = this.presentationdayService
      .getPresentationDays()
      .subscribe({
        next: (result) => (this.presentationdays = result),
        error: (err) => (this.errorMessage = err.message),
      });
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
        next: () => this.getPresentationDays(),
        error: (e) => (this.errorMessage = e.message),
      });
  }
}
