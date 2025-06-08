import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlotListComponent } from './slot-list.component';

describe('SlotListComponent', () => {
  let component: AdminSlotListComponent;
  let fixture: ComponentFixture<AdminSlotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSlotListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
