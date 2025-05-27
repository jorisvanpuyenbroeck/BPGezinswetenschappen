import { Component, OnInit, OnDestroy } from '@angular/core';
import { Slot } from '../../../../shared/models/slot';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SlotService } from '../../../../shared/services/slot.service';

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css'],
})
export class SlotListComponent implements OnInit, OnDestroy {
  slots: Slot[] = [];
  slots$: Subscription = new Subscription();
  deleteSlot$: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(private slotService: SlotService, private router: Router) {}

  ngOnInit(): void {
    this.getSlots();
  }

  ngOnDestroy(): void {
    this.slots$.unsubscribe();
    this.deleteSlot$.unsubscribe();
  }

  getSlots() {
    this.slots$ = this.slotService.getSlots().subscribe({
      next: (result) => (this.slots = result),
      error: (err) => (this.errorMessage = err.message),
    });
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
      next: () => this.getSlots(),
      error: (e) => (this.errorMessage = e.message),
    });
  }
}
