import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Slot } from '../../../../shared/models/slot';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SlotService } from '../../../../shared/services/slot.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css'],
})
export class AdminSlotListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = [
    'slotId',
    'startTime',
    'endTime',
    'classroom',
    'actions',
  ];
  hideableColumns: string[] = []; // No columns to hide by default
  dataSource = new MatTableDataSource<Slot>([]);
  
  slots$: Subscription = new Subscription();
  deleteSlot$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private slotService: SlotService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getSlots();
  }

  ngOnDestroy(): void {
    this.slots$.unsubscribe();
    if (this.deleteSlot$) {
      this.deleteSlot$.unsubscribe();
    }
  }

  getSlots() {
    this.slots$ = this.slotService.getSlots().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {
        this.showNotification('Error loading slots: ' + err.message, 'Close');
      },
    });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/slot/form'], { state: { mode: 'add' } });
  }

  onEdit(slot: Slot) {
    this.router.navigate(['admin/slot/form'], {
      state: { id: slot.slotId, mode: 'edit' },
    });
  }

  onDelete(slot: Slot) {
    this.deleteSlot$ = this.slotService.deleteSlot(slot.slotId).subscribe({
      next: () => {
        this.getSlots();
        this.showNotification('Slot successfully deleted', 'Close');
      },
      error: (error) => {
        this.showNotification('Error deleting slot: ' + error.message, 'Close');
      },
    });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
