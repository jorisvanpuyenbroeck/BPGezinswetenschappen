import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Presentation } from '../../../../shared/models/presentation';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PresentationService } from '../../../../shared/services/presentation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.css'],
})
export class AdminPresentationListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'presentationId',
    'student',
    'coach',
    'expert',
    'actions',
  ];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Presentation>([]);
  presentations$: Subscription = new Subscription();
  deletePresentation$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private presentationService: PresentationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPresentations();
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
            'Close'
          );
        },
      });
  }

  // Handle events from generic list component
  onAdd() {
    this.router.navigate(['admin/presentation/form'], {
      state: { mode: 'add' },
    });
  }

  onEdit(presentation: Presentation) {
    this.router.navigate(['admin/presentation/form'], {
      state: { id: presentation.presentationId, mode: 'edit' },
    });
  }

  onDelete(presentation: Presentation) {
    this.deletePresentation$ = this.presentationService
      .deletePresentation(presentation.presentationId)
      .subscribe({
        next: () => {
          this.getPresentations();
          this.showNotification('Presentation successfully deleted', 'Close');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting presentation: ' + error.message,
            'Close'
          );
        },
      });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
