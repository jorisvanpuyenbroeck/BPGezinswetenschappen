import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css'],
})
export class GenericListComponent implements OnInit, OnDestroy {
  // Inputs to configure the component
  @Input() title: string = 'Items';
  @Input() addButtonText: string = 'Add Item';
  @Input() searchPlaceholder: string = 'Search items';
  @Input() noDataMessage: string = 'No data matching the filter';
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() allColumns: string[] = [];
  displayedColumns: string[] = []; // This will be calculated based on allColumns and hideableColumns
  @Input() hideableColumns: string[] = []; // Columns that can be hidden on small screens
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() defaultPageSize: number = 10;

  // Events
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() filter = new EventEmitter<string>();

  // Internal state
  isSmallScreen = false;
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    // Initialize displayedColumns from allColumns
    this.displayedColumns = [...this.allColumns];
    this.setupResponsiveColumns();
    // Initial check for current screen size
    this.checkScreenSize();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Setup breakpoint observer for responsive behavior
  setupResponsiveColumns(): void {
    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.updateDisplayedColumns();
      });
  }

  // Manual check for screen size
  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 800;
    this.updateDisplayedColumns();
  }

  // Update columns based on screen size
  updateDisplayedColumns(): void {
    if (this.isSmallScreen) {
      // Remove hideableColumns on small screens
      this.displayedColumns = this.allColumns.filter(
        (column) => !this.hideableColumns.includes(column)
      );
    } else {
      // Show all columns on larger screens
      this.displayedColumns = [...this.allColumns];
    }
  }

  // Handle filter input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filter.emit(filterValue);
  }

  // Action handlers
  onAdd(): void {
    this.add.emit();
  }

  onEdit(item: any): void {
    this.edit.emit(item);
  }

  onDelete(item: any): void {
    this.delete.emit(item);
  }

  // Helper method to safely get topic names from an array
  getTopicNames(topics: any[]): string {
    if (topics && Array.isArray(topics)) {
      return topics.map((topic) => topic.name).join(', ');
    }
    return '';
  }

  // Helper method to show notifications
  showNotification(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
