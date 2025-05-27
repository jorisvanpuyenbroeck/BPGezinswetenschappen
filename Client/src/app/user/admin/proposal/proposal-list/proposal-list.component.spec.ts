import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProposalListComponent } from './proposal-list.component';

describe('ProposalListComponent', () => {
  let component: AdminProposalListComponent;
  let fixture: ComponentFixture<AdminProposalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProposalListComponent]
    });
    fixture = TestBed.createComponent(AdminProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
