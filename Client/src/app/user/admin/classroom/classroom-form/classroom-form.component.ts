import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classroom } from '../../../../shared/models/classroom';
import { ClassroomService } from '../../../../shared/services/classroom.service';
import { Location } from '@angular/common';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormFields } from '../../../../shared/models';
import { NotificationService } from '../../../../shared/services/notification.service';

interface ClassroomFormMode {
  isEdit: boolean;
  classroomId?: number;
}

@Component({
  selector: 'app-admin-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css'],
})
export class AdminClassroomFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  classroom: Classroom = {
    classroomId: 0,
    name: '',
    level: '',
    slots: [],
  };
  classroomForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Form field configurations
  readonly fields: FormFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Classroom name',
      required: true,
    },
    {
      type: 'text',
      name: 'level',
      label: 'Level',
      placeholder: 'Classroom level',
      required: false,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private location: Location,
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
    // Combine route params and state
    const formMode = this.getFormMode();
    this.isEdit = formMode.isEdit;

    if (formMode.isEdit && formMode.classroomId) {
      this.loadClassroom(formMode.classroomId);
    }
  }

  private getFormMode(): ClassroomFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      classroomId: this.extractClassroomId(params['id'] || state['id']),
    };
  }

  private extractClassroomId(
    id: string | number | undefined
  ): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.classroomForm = this.formBuilder.group({
      name: [this.classroom.name, Validators.required],
      level: [this.classroom.level],
    });
  }

  private loadClassroom(id: number): void {
    const sub = this.classroomService.getClassroom(id).subscribe({
      next: (classroom) => {
        this.classroom = classroom;
        this.classroomForm.patchValue({
          name: classroom.name,
          level: classroom.level,
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading classroom: ' + error.message;
        this.notificationService.error(this.errorMessage);
        this.router.navigate(['/admin/classroom']);
      },
    });
    this.subscriptions.add(sub);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.classroomForm.valid) {
      const classroomData = { ...this.classroom, ...this.classroomForm.value };

      const request = this.isEdit
        ? this.classroomService.updateClassroom(
            this.classroom.classroomId,
            classroomData
          )
        : this.classroomService.createClassroom(classroomData);

      const sub = request.subscribe({
        next: () => {
          const message = `Classroom successfully ${
            this.isEdit ? 'updated' : 'created'
          }`;
          this.notificationService.success(message);
          this.router.navigate(['/admin/classroom']);
        },
        error: (error) => {
          this.errorMessage = 'Error saving classroom: ' + error.message;
          this.notificationService.error(this.errorMessage);
        },
      });
      this.subscriptions.add(sub);
    }
  }

  onFormCancel(): void {
    this.location.back();
  }
}
