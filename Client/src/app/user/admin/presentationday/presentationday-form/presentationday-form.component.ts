import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormFields } from '../../../../shared/models';

interface PresentationDayFormMode {
  isEdit: boolean;
  presentationDayId?: number;
}

interface PresentationDayFormValue {
  date: string;
  examPeriodId: number;
}

@Component({
  selector: 'app-admin-presentationday-form',
  templateUrl: './presentationday-form.component.html',
  styleUrls: ['./presentationday-form.component.css'],
})
export class AdminPresentationdayFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  presentationDay: PresentationDay = {
    presentationDayId: 0,
    date: '',
    examPeriodId: 0,
    examPeriod: null,
    slots: [],
  };
  presentationDayForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  fields: FormFields = [
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      placeholder: 'Select date',
      required: true,
    },
    {
      type: 'select',
      name: 'examPeriodId',
      label: 'Exam Period',
      placeholder: 'Select exam period',
      required: true,
      options: [], // Will be populated with exam periods
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private presentationdayService: PresentationdayService,
    private examperiodService: ExamperiodService,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadExamPeriods();
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.presentationDayId) {
      this.loadPresentationDay(formMode.presentationDayId);
    }
  }

  private getFormMode(): PresentationDayFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      presentationDayId: this.extractPresentationDayId(
        params['id'] || state['id']
      ),
    };
  }

  private extractPresentationDayId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.presentationDayForm = this.fb.group<{
      [K in keyof PresentationDayFormValue]: any;
    }>({
      date: ['', [Validators.required]],
      examPeriodId: ['', [Validators.required]],
    });
  }

  private loadExamPeriods(): void {
    const sub = this.examperiodService.getExamPeriods().subscribe({
      next: (examPeriods: ExamPeriod[]) => {
        // Update select field options
        this.fields = this.fields.map((field) => {
          if (field.type === 'select' && field.name === 'examPeriodId') {
            return {
              ...field,
              options: examPeriods.map((examPeriod) => ({
                value: examPeriod.examPeriodId,
                viewValue: examPeriod.name,
              })),
            };
          }
          return field;
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading exam periods: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  private loadPresentationDay(id: number): void {
    const sub = this.presentationdayService.getPresentationDay(id).subscribe({
      next: (presentationDay: PresentationDay) => {
        this.presentationDay = presentationDay;
        this.presentationDayForm.patchValue({
          date: presentationDay.date,
          examPeriodId: presentationDay.examPeriodId,
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading presentation day: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(formValue: PresentationDayFormValue): void {
    this.isSubmitted = true;

    const presentationDay: PresentationDay = {
      ...this.presentationDay,
      ...formValue,
    };

    const operation = this.isEdit
      ? this.presentationdayService.updatePresentationDay(
          presentationDay.presentationDayId,
          presentationDay
        )
      : this.presentationdayService.createPresentationDay(presentationDay);

    const sub = operation.subscribe({
      next: () => {
        const message = this.isEdit
          ? 'Presentation day updated'
          : 'Presentation day created';
        this.notificationService.showSuccess(message);
        this.router.navigate(['/admin/presentationdays']);
      },
      error: (error: Error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error saving presentation day: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.location.back();
  }
}
