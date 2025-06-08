import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentationdayListComponent } from './presentationday-list.component';

describe('AdminPresentationdayListComponent', () => {
  let component: AdminPresentationdayListComponent;
  let fixture: ComponentFixture<AdminPresentationdayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPresentationdayListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPresentationdayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
