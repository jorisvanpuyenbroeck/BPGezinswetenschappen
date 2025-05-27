import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: AdminUserListComponent;
  let fixture: ComponentFixture<AdminUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
