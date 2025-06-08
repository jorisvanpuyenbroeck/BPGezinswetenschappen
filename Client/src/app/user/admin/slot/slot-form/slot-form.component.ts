import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { FormFields } from '../../../../shared/models';
import { ClassroomService } from '../../../../shared/services/classroom.service';
import { SlotService } from '../../../../shared/services/slot.service';
import { PresentationdayService } from '../../../../shared/services/presentationday.service';
import { Classroom } from '../../../../shared/models/classroom';
import { PresentationDay } from '../../../../shared/models/presentationday';
import { Slot } from '../../../../shared/models/slot';

interface SlotFormMode {
  isEdit: boolean;
  slotId?: number;
}

interface SlotFormValue {
  startTime: string;
  classroomId: number;
  presentationDayId: number;
}

@Component({
  selector: 'app-admin-slot-form',
  templateUrl: './slot-form.component.html',
  styleUrls: ['./slot-form.component.css'],
})
export class AdminSlotFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  slot: Slot = {
    slotId: 0,
    startTime: '',
    endTime: '',
    classroomId: 0,
    classroom: undefined,
    presentationDayId: 0,
    presentationDay: undefined,
    presentations: [],
    availabilities: [],
  };
  slotForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  fields: FormFields = [
    {
      type: 'text', // We could use a time type if available in the generic form
      name: 'startTime',
      label: 'Start Time',
      placeholder: 'HH:MM',
      required: true,
    },
    {
      type: 'select',
      name: 'classroomId',
      label: 'Classroom',
      placeholder: 'Select classroom',
      required: true,
      options: [], // Will be populated with classrooms
    },
    {
      type: 'select',
      name: 'presentationDayId',
      label: 'Presentation Day',
      placeholder: 'Select presentation day',
      required: true,
      options: [], // Will be populated with presentation days
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private slotService: SlotService,
    private classroomService: ClassroomService,
    private presentationdayService: PresentationdayService,
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

    if (formMode.isEdit && formMode.slotId) {
      this.loadSlot(formMode.slotId);
    }
  }

  private getFormMode(): SlotFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      slotId: this.extractSlotId(params['id'] || state['id']),
    };
  }

  private extractSlotId(id: string | number | undefined): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.slotForm = this.fb.group<{ [K in keyof SlotFormValue]: any }>({
      startTime: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'),
        ],
      ],
      classroomId: ['', [Validators.required]],
      presentationDayId: ['', [Validators.required]],
    });
  }

  private loadOptions(): void {
    const classroomsSub = this.classroomService.getClassrooms().subscribe({
      next: (classrooms: Classroom[]) => {
        this.updateSelectOptions('classroomId', classrooms, 'name');
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading classrooms: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });

    const presentationDaysSub = this.presentationdayService
      .getPresentationDays()
      .subscribe({
        next: (presentationDays: PresentationDay[]) => {
          this.updateSelectOptions(
            'presentationDayId',
            presentationDays,
            'date'
          );
        },
        error: (error: Error) => {
          this.errorMessage =
            'Error loading presentation days: ' + error.message;
          this.notificationService.error(this.errorMessage);
        },
      });

    this.subscriptions.add(classroomsSub);
    this.subscriptions.add(presentationDaysSub);
  }

  private updateSelectOptions(
    fieldName: string,
    items: any[],
    labelProperty: string
  ): void {
    this.fields = this.fields.map((field) => {
      if (field.type === 'select' && field.name === fieldName) {
        return {
          ...field,
          options: items.map((item) => ({
            value:
              fieldName === 'classroomId'
                ? item.classroomId
                : item.presentationDayId,
            viewValue: item[labelProperty],
          })),
        };
      }
      return field;
    });
  }

  private loadSlot(id: number): void {
    const sub = this.slotService.getSlot(id).subscribe({
      next: (slot: Slot) => {
        this.slot = slot;
        this.slotForm.patchValue({
          startTime: slot.startTime,
          classroomId: slot.classroomId,
          presentationDayId: slot.presentationDayId,
        });
      },
      error: (error: Error) => {
        this.errorMessage = 'Error loading slot: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(formValue: SlotFormValue): void {
    this.isSubmitted = true;

    const slot: Slot = {
      ...this.slot,
      ...formValue,
    };

    const operation = this.isEdit
      ? this.slotService.updateSlot(slot.slotId, slot)
      : this.slotService.createSlot(slot);

    const sub = operation.subscribe({
      next: () => {
        const message = this.isEdit ? 'Slot updated' : 'Slot created';
        this.notificationService.success(message);
        this.router.navigate(['/admin/slots']);
      },
      error: (error: Error) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error saving slot: ' + error.message;
        this.notificationService.error(this.errorMessage);
      },
    });
    this.subscriptions.add(sub);
  }

  onCancel(): void {
    this.location.back();
  }
}
