import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Presentation } from '../../../../shared/models/presentation';
import { PresentationService } from '../../../../shared/services/presentation.service';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormFields } from '../../../../shared/models';

interface PresentationFormMode {
  isEdit: boolean;
  presentationId?: number;
}

interface PresentationFormValue {
  studentId: number;
  coachId: number;
  expertId?: number;
}

@Component({
  selector: 'app-admin-presentation-form',
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.css'],
})
export class AdminPresentationFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
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
  presentationForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  fields: FormFields = [
    {
      type: 'select',
      name: 'studentId',
      label: 'Student',
      placeholder: 'Select student',
      required: true,
      options: [], // Will be populated with students
    },
    {
      type: 'select',
      name: 'coachId',
      label: 'Coach',
      placeholder: 'Select coach',
      required: true,
      options: [], // Will be populated with coaches
    },
    {
      type: 'select',
      name: 'expertId',
      label: 'Expert',
      placeholder: 'Select expert',
      required: false,
      options: [], // Will be populated with experts
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private presentationService: PresentationService,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadOptions();
    this.initializeFormMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initializeFormMode(): void {
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.presentationId) {
      this.loadPresentation(formMode.presentationId);
    }
  }

  private getFormMode(): PresentationFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      presentationId: this.extractPresentationId(params['id'] || state['id']),
    };
  }

  private extractPresentationId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.presentationForm = this.fb.group<{
      [K in keyof PresentationFormValue]: any;
    }>({
      studentId: ['', [Validators.required]],
      coachId: ['', [Validators.required]],
      expertId: [''],
    });
  }

  private loadOptions(): void {
    // Load students, coaches, and experts and update field options
    // Implementation depends on your available services and data structures
    // Example:
    /*
    const sub = combineLatest([
      this.userService.getStudents(),
      this.userService.getCoaches(),
      this.userService.getExperts(),
    ]).subscribe({
      next: ([students, coaches, experts]) => {
        this.updateSelectOptions('studentId', students);
        this.updateSelectOptions('coachId', coaches);
        this.updateSelectOptions('expertId', experts);
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading options: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
    */
  }

  private updateSelectOptions(fieldName: string, items: any[]): void {
    this.fields = this.fields.map((field) => {
      if (field.type === 'select' && field.name === fieldName) {
        return {
          ...field,
          options: items.map((item) => ({
            value: item.id,
            viewValue: `${item.firstName} ${item.lastName}`,
          })),
        };
      }
      return field;
    });
  }

  private loadPresentation(id: number): void {
    const sub = this.presentationService.getPresentation(id).subscribe({
      next: (presentation: Presentation) => {
        this.presentation = presentation;
        this.presentationForm.patchValue({
          studentId: presentation.studentId,
          coachId: presentation.coachId,
          expertId: presentation.expertId,
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading presentation: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(formValue: PresentationFormValue): void {
    this.isSubmitted = true;

    const presentation: Presentation = {
      ...this.presentation,
      ...formValue,
    };

    const operation = this.isEdit
      ? this.presentationService.updatePresentation(
          presentation.presentationId,
          presentation
        )
      : this.presentationService.createPresentation(presentation);

    const sub = operation.subscribe({
      next: () => {
        const message = this.isEdit
          ? 'Presentation updated'
          : 'Presentation created';
        this.notificationService.success(message);
        this.router.navigate(['/admin/presentations']);
      },
      error: (error: Error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error saving presentation: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.location.back();
  }
}
