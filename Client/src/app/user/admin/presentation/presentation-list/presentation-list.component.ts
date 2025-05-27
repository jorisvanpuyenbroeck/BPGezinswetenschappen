import { Component, OnInit, OnDestroy } from '@angular/core';
import { Presentation } from '../../../../shared/models/presentation';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationService } from '../../../../shared/services/presentation.service';

@Component({
  selector: 'app-admin-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
})
export class AdminPresentationListComponent implements OnInit, OnDestroy {
  presentations: Presentation[] = [];
  presentations$: Subscription = new Subscription();
  deletePresentation$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private presentationService: PresentationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPresentations();
  }

  ngOnDestroy(): void {
    this.presentations$.unsubscribe();
    this.deletePresentation$.unsubscribe();
  }

  getPresentations() {
    this.presentations$ = this.presentationService
      .getPresentations()
      .subscribe({
        next: (result) => (this.presentations = result),
        error: (err) => (this.errorMessage = err.message),
      });
  }

  add() {
    this.router.navigate(['admin/presentation/form'], {
      state: { mode: 'add' },
    });
  }

  edit(id: number) {
    this.router.navigate(['admin/presentation/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deletePresentation$ = this.presentationService
      .deletePresentation(id)
      .subscribe({
        next: () => this.getPresentations(),
        error: (e) => (this.errorMessage = e.message),
      });
  }
}
