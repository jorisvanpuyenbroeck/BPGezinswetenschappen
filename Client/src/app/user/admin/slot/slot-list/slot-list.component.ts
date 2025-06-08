import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Slot } from '../../../../shared/models/slot';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SlotService } from '../../../../shared/services/slot.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css'],
})
export class AdminSlotListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = [
    'slotId',
    'startTime',
    'endTime',
    'classroom',
    'actions',
  ];
  dataSource = new MatTableDataSource<Slot>([]);
  slots$: Subscription = new Subscription();
  deleteSlot$: Subscription = new Subscription();
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private slotService: SlotService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSlots();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.slots$.unsubscribe();
    this.deleteSlot$.unsubscribe();
  }

  getSlots() {
    this.slots$ = this.slotService.getSlots().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.showNotification('Error loading slots: ' + err.message, 'error');
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
    this.router.navigate(['admin/slot/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/slot/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteSlot$ = this.slotService.deleteSlot(id).subscribe({
      next: () => {
        this.getSlots();
        this.showNotification('Slot successfully deleted', 'success');
      },
      error: (e) => {
        this.errorMessage = e.message;
        this.showNotification('Error deleting slot: ' + e.message, 'error');
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
