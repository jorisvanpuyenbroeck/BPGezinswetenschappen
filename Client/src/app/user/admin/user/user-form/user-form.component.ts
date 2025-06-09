import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {
  User,
  UserCreateDto,
  UserUpdateDto,
} from '../../../../shared/models/user';
import { UserService } from '../../../user.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { GenericFormComponent } from '../../../../shared/layout/generic-form/generic-form.component';
import { FormFields } from '../../../../shared/models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpErrorResponse } from '@angular/common/http';

interface UserFormMode {
  isEdit: boolean;
  userId?: number;
}

interface UserFormValue {
  userName: string;
  givenName: string;
  familyName: string;
  email: string;
  programType: string;
  userLevel: string;
  expertise: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit, OnDestroy {
  @ViewChild(GenericFormComponent) genericForm!: GenericFormComponent;

  // Form state
  user: User = {
    userId: 0,
    userName: '',
    givenName: '',
    familyName: '',
    email: '',
    programType: '',
    userLevel: '',
    expertise: '',
  };
  userForm!: FormGroup;
  isEdit = false;
  isSubmitted = false;
  errorMessage = '';

  // Form field configurations
  readonly userLevelOptions = [
    { value: 'student', viewValue: 'Student' },
    { value: 'docent', viewValue: 'Docent' },
    { value: 'admin', viewValue: 'Administrator' },
    { value: 'mentor', viewValue: 'Mentor' },
  ];

  readonly programTypeOptions = [
    { value: 'bachelor', viewValue: 'Bachelor' },
    { value: 'master', viewValue: 'Master' },
    { value: 'schakelprogramma', viewValue: 'Schakelprogramma' },
  ];

  readonly fields: FormFields = [
    {
      type: 'text',
      name: 'userName',
      label: 'Username',
      placeholder: 'Enter username',
      required: true,
    },
    {
      type: 'text',
      name: 'givenName',
      label: 'First Name',
      placeholder: 'Enter first name',
      required: true,
    },
    {
      type: 'text',
      name: 'familyName',
      label: 'Last Name',
      placeholder: 'Enter last name',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
      required: true,
    },
    {
      type: 'select',
      name: 'programType',
      label: 'Program Type',
      placeholder: 'Select program type',
      required: true,
      options: this.programTypeOptions,
    },
    {
      type: 'select',
      name: 'userLevel',
      label: 'User Level',
      placeholder: 'Select user level',
      required: true,
      options: this.userLevelOptions,
    },
    {
      type: 'textarea',
      name: 'expertise',
      label: 'Expertise',
      placeholder: 'Enter expertise/specialization',
      required: false,
      rows: 3,
    },
  ];

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
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

    if (formMode.isEdit && formMode.userId) {
      this.loadUser(formMode.userId);
    }
  }

  private getFormMode(): UserFormMode {
    const params = this.route.snapshot.queryParams;
    const state = history.state;

    return {
      isEdit: params['mode'] === 'edit' || state['mode'] === 'edit',
      userId: this.extractUserId(params['id'] || state['id']),
    };
  }

  private extractUserId(id: string | number | undefined): number | undefined {
    if (id === undefined) return undefined;
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return isNaN(numericId) ? undefined : numericId;
  }

  private initForm(): void {
    this.userForm = this.fb.group<{ [K in keyof UserFormValue]: any }>({
      userName: ['', [Validators.required]],
      givenName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      programType: ['', [Validators.required]],
      userLevel: ['', [Validators.required]],
      expertise: [''],
    });
  }

  private loadUser(id: number): void {
    this.subscriptions.add(
      this.userService.getUserById(id).subscribe({
        next: (user: User) => {
          this.user = user;
          this.userForm.patchValue({
            userName: user.userName,
            givenName: user.givenName,
            familyName: user.familyName,
            email: user.email,
            programType: user.programType,
            userLevel: user.userLevel,
            expertise: user.expertise,
          });
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = `Error loading user: ${
            error.error?.message || error.message
          }`;
          this.notificationService.showNotification(this.errorMessage);
        },
      })
    );
  }

  onFormSubmit(formValue: UserFormValue): void {
    this.isSubmitted = true;

    if (this.isEdit) {
      const updateDto: UserUpdateDto = formValue;
      this.updateUser(this.user.userId!, updateDto);
    } else {
      const createDto: UserCreateDto = formValue;
      this.createUser(createDto);
    }
  }

  private createUser(createDto: UserCreateDto): void {
    this.subscriptions.add(
      this.userService.createUser(createDto).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'User created successfully'
          );
          this.router.navigate(['admin/user']);
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitted = false;
          this.errorMessage = `Error creating user: ${
            error.error?.message || error.message
          }`;
          this.notificationService.showNotification(this.errorMessage);
        },
      })
    );
  }

  private updateUser(id: number, updateDto: UserUpdateDto): void {
    this.subscriptions.add(
      this.userService.updateUser(id, updateDto).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'User updated successfully'
          );
          this.router.navigate(['admin/user']);
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitted = false;
          this.errorMessage = `Error updating user: ${
            error.error?.message || error.message
          }`;
          this.notificationService.showNotification(this.errorMessage);
        },
      })
    );
  }

  onFormCancel(): void {
    this.location.back();
  }
}
