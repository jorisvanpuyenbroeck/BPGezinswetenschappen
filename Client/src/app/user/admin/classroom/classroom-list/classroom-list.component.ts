import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Classroom } from '../../../../shared/models/classroom';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClassroomService } from '../../../../shared/services/classroom.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class AdminClassroomListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ['classroomId', 'name', 'level', 'actions'];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Classroom>([]);

  // Subscriptions
  classrooms$: Subscription = new Subscription();
  deleteClassroom$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private classroomService: ClassroomService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getClassrooms();
  }

  ngOnDestroy(): void {
    this.classrooms$.unsubscribe();
    if (this.deleteClassroom$) {
      this.deleteClassroom$.unsubscribe();
    }
  }

  getClassrooms() {
    this.classrooms$ = this.classroomService.getClassrooms().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification(
          'Error loading classrooms: ' + error.message,
          'Close'
        );
      },
    });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/classroom/form'], { state: { mode: 'add' } });
  }

  onEdit(classroom: Classroom) {
    this.router.navigate(['admin/classroom/form'], {
      state: { id: classroom.classroomId, mode: 'edit' },
    });
  }

  onDelete(classroom: Classroom) {
    this.deleteClassroom$ = this.classroomService
      .deleteClassroom(classroom.classroomId)
      .subscribe({
        next: () => {
          this.getClassrooms();
          this.showNotification('Classroom successfully deleted', 'Close');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting classroom: ' + error.message,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
