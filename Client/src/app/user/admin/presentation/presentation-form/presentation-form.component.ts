import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Presentation } from '../../../../shared/models/presentation';
import { PresentationService } from '../../../../shared/services/presentation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css'],
})
export class AdminPresentationFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  presentationId: number = 0;
  presentation: Presentation = {
    presentationId: 0,
    studentId: 0,
    student: {} as any,
    coachId: 0,
    coach: {} as any,
    expertId: undefined,
    expert: undefined,
    slots: [],
  };
  isSubmitted: boolean = false;
  errorMessage: string = '';
  presentation$: Subscription = new Subscription();
  postPresentation$: Subscription = new Subscription();
  putPresentation$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private presentationService: PresentationService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.presentationId =
      +this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    if (this.isEdit && this.presentationId) {
      this.presentation$ = this.presentationService
        .getPresentation(this.presentationId)
        .subscribe({
          next: (result) => (this.presentation = result),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  ngOnDestroy(): void {
    this.presentation$.unsubscribe();
    this.postPresentation$.unsubscribe();
    this.putPresentation$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postPresentation$ = this.presentationService
        .createPresentation(this.presentation)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    } else if (this.isEdit) {
      this.putPresentation$ = this.presentationService
        .updatePresentation(this.presentationId, this.presentation)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }
}
