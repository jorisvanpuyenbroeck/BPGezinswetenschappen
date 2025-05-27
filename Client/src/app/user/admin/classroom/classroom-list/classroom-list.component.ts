import { Component, OnInit, OnDestroy } from '@angular/core';
import { Classroom } from '../../../../shared/models/classroom';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// TODO: Ensure the ClassroomService exists at the correct path or update the import path accordingly.
import { ClassroomService } from '../../../../shared/services/classroom.service';

@Component({
  selector: 'app-admin-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class AdminClassroomListComponent implements OnInit, OnDestroy {
  classrooms: Classroom[] = [];
  classrooms$: Subscription = new Subscription();
  deleteClassroom$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClassrooms();
  }

  ngOnDestroy(): void {
    this.classrooms$.unsubscribe();
    this.deleteClassroom$.unsubscribe();
  }

  getClassrooms() {
    this.classrooms$ = this.classroomService.getClassrooms().subscribe({
      next: (result) => (this.classrooms = result),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  add() {
    this.router.navigate(['admin/classroom/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/classroom/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteClassroom$ = this.classroomService
      .deleteClassroom(id)
      .subscribe({
        next: () => this.getClassrooms(),
        error: (e) => (this.errorMessage = e.message),
      });
  }
}
