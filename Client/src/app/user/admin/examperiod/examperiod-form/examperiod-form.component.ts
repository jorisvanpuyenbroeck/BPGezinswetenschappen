import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamPeriod } from '../../../../shared/models/examperiod';
import { ExamperiodService } from '../../../../shared/services/examperiod.service';
import { YearService } from '../../../../shared/services/year.service';
import { Year } from '../../../../shared/models/year';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormFields } from '../../../../shared/models';

interface ExamPeriodFormMode {
  isEdit: boolean;
  examPeriodId?: number;
}

interface ExamPeriodFormValue {
  name: string;
  yearId: number;
}

@Component({
  selector: 'app-admin-examperiod-form',
  templateUrl: './examperiod-form.component.html',
  styleUrls: ['./examperiod-form.component.css'],
})
export class AdminExamperiodFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  examPeriod: ExamPeriod = {
    examPeriodId: 0,
    name: '',
    yearId: 0,
    year: null,
    presentationDays: [],
  };
  examPeriodForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Data for select fields
  years: Year[] = [];

  // Form field configurations
  fields: FormFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Exam period name',
      required: true,
    },
    {
      type: 'select',
      name: 'yearId',
      label: 'Academic Year',
      placeholder: 'Select academic year',
      required: true,
      options: [], // Will be populated with years
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private examperiodService: ExamperiodService,
    private yearService: YearService,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadYears();
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.examPeriodId) {
      this.loadExamPeriod(formMode.examPeriodId);
    }
  }

  private getFormMode(): ExamPeriodFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      examPeriodId: this.extractExamPeriodId(params['id'] || state['id']),
    };
  }

  private extractExamPeriodId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.examPeriodForm = this.fb.group<{
      [K in keyof ExamPeriodFormValue]: any;
    }>({
      name: ['', [Validators.required]],
      yearId: ['', [Validators.required]],
    });
  }
  private loadYears(): void {
    const sub = this.yearService.getYears().subscribe({
      next: (years: Year[]) => {
        this.years = years;
        // Update select field options without modifying readonly properties
        const yearOptions = years.map((year) => ({
          value: year.yearId,
          viewValue: year.label,
        }));
        this.fields = this.fields.map((field) => {
          if (field.type === 'select' && field.name === 'yearId') {
            const updatedField = { ...field, options: yearOptions };
            // Ensure the options array is properly assigned
            return updatedField;
          }
          return field;
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading years: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  private loadExamPeriod(id: number): void {
    const sub = this.examperiodService.getExamPeriod(id).subscribe({
      next: (examPeriod: ExamPeriod) => {
        this.examPeriod = examPeriod;

        // If years are already loaded, patch the form values
        if (this.years.length > 0) {
          setTimeout(() => {
            this.examPeriodForm.patchValue(
              {
                name: examPeriod.name,
                yearId: examPeriod.yearId,
              },
              { emitEvent: false }
            );
          });
        }
        // If years aren't loaded yet, they'll be set in loadYears when they arrive
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading exam period: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(formValue: ExamPeriodFormValue): void {
    this.isSubmitted = true;

    const examPeriod: ExamPeriod = {
      ...this.examPeriod,
      ...formValue,
    };

    const operation = this.isEdit
      ? this.examperiodService.updateExamPeriod(
          examPeriod.examPeriodId,
          examPeriod
        )
      : this.examperiodService.createExamPeriod(examPeriod);

    const sub = operation.subscribe({
      next: () => {
        const message = this.isEdit
          ? 'Exam period updated'
          : 'Exam period created';
        this.notificationService.showSuccess(message);
        this.router.navigate(['/admin/examperiod']);
      },
      error: (error: Error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error saving exam period: ' + error.message;
        this.notificationService.showError(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.location.back();
  }
}
