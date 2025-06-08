import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Year } from '../../../../shared/models/year';
import { YearService } from '../../../../shared/services/year.service';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormFields } from '../../../../shared/models';

interface YearFormMode {
  isEdit: boolean;
  yearId?: number;
}

interface YearFormValue {
  label: string;
}

@Component({
  selector: 'app-admin-year-form',
  templateUrl: './year-form.component.html',
  styleUrls: ['./year-form.component.css'],
})
export class AdminYearFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  year: Year = { yearId: 0, label: '', examPeriods: [] };
  yearForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  readonly fields: FormFields = [
    {
      type: 'text',
      name: 'label',
      label: 'Label',
      placeholder: 'Academic year (e.g., 2023-2024)',
      required: true,
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private yearService: YearService,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.yearId) {
      this.loadYear(formMode.yearId);
    }
  }

  private getFormMode(): YearFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      yearId: this.extractYearId(params['id'] || state['id']),
    };
  }

  private extractYearId(id: string | number | undefined): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.yearForm = this.fb.group<{ [K in keyof YearFormValue]: any }>({
      label: ['', [Validators.required]],
    });
  }

  private loadYear(id: number): void {
    const sub = this.yearService.getYear(id).subscribe({
      next: (year: Year) => {
        this.year = year;
        this.yearForm.patchValue({
          label: year.label,
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading year: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(formValue: YearFormValue): void {
    this.isSubmitted = true;
    const year: Year = {
      ...this.year,
      ...formValue,
    };

    const operation = this.isEdit
      ? this.yearService.updateYear(year.yearId, year)
      : this.yearService.createYear(year);

    const sub = operation.subscribe({
      next: () => {
        const message = this.isEdit ? 'Year updated' : 'Year created';
        this.notificationService.success(message);
        this.router.navigate(['/admin/years']);
      },
      error: (error: Error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error saving year: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.location.back();
  }
}
