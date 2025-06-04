import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Classroom } from '../../../../shared/models/classroom';
import { ClassroomService } from '../../../../shared/services/classroom.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.css'],
})
export class AdminClassroomFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  classroomId: number = 0;
  classroom: Classroom = { classroomId: 0, name: '', level: '', slots: [] };
  isSubmitted: boolean = false;
  errorMessage: string = '';
  classroom$: Subscription = new Subscription();
  postClassroom$: Subscription = new Subscription();
  putClassroom$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private classroomService: ClassroomService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.classroomId =
      +this.router.getCurrentNavigation()?.extras.state?.['id'];
    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    if (this.isEdit && this.classroomId) {
      this.classroom$ = this.classroomService
        .getClassroom(this.classroomId)
        .subscribe({
          next: (result) => (this.classroom = result),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  ngOnDestroy(): void {
    this.classroom$.unsubscribe();
    this.postClassroom$.unsubscribe();
    this.putClassroom$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postClassroom$ = this.classroomService
        .createClassroom(this.classroom)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    } else if (this.isEdit) {
      this.putClassroom$ = this.classroomService
        .updateClassroom(this.classroomId, this.classroom)
        .subscribe({
          next: () => this.location.back(),
          error: (err) => (this.errorMessage = err.message),
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
