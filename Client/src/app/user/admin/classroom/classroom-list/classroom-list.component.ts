import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Classroom } from '../../../../shared/models/classroom';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ClassroomService } from '../../../../shared/services/classroom.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.css'],
})
export class AdminClassroomListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = ['classroomId', 'name', 'level', 'actions'];
  dataSource = new MatTableDataSource<Classroom>([]);
  classrooms$: Subscription = new Subscription();
  deleteClassroom$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private classroomService: ClassroomService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getClassrooms();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.classrooms$.unsubscribe();
    this.deleteClassroom$.unsubscribe();
  }

  getClassrooms() {
    this.classrooms$ = this.classroomService.getClassrooms().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.showNotification(
          'Error loading classrooms: ' + err.message,
          'error'
        );
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        next: () => {
          this.getClassrooms();
          this.showNotification('Classroom successfully deleted', 'success');
        },
        error: (e) => {
          this.errorMessage = e.message;
          this.showNotification(
            'Error deleting classroom: ' + e.message,
            'error'
          );
        },
      });
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass:
        action === 'error' ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
