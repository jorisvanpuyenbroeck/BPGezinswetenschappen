import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Presentation } from '../../../../shared/models/presentation';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationService } from '../../../../shared/services/presentation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
})
export class AdminPresentationListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'presentationId',
    'student',
    'coach',
    'expert',
    'actions',
  ];
  dataSource = new MatTableDataSource<Presentation>([]);
  presentations$: Subscription = new Subscription();
  deletePresentation$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private presentationService: PresentationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPresentations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.presentations$.unsubscribe();
    if (this.deletePresentation$) {
      this.deletePresentation$.unsubscribe();
    }
  }

  getPresentations() {
    this.presentations$ = this.presentationService
      .getPresentations()
      .subscribe({
        next: (result) => {
          this.dataSource.data = result;
        },
        error: (error) => {
          this.showNotification(
            'Error loading presentations: ' + error.message,
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
    this.router.navigate(['admin/presentation/form'], {
      state: { mode: 'add' },
    });
  }

  edit(id: number) {
    this.router.navigate(['admin/presentation/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deletePresentation$ = this.presentationService
      .deletePresentation(id)
      .subscribe({
        next: () => {
          this.getPresentations();
          this.showNotification('Presentation successfully deleted', 'success');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting presentation: ' + error.message,
            'error'
          );
        },
      });
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
