import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProposalFormComponent } from './proposal-form.component';
import { AdminProposalListComponent } from '../proposal-list/proposal-list.component';

describe('ProposalFormComponent', () => {
  let component: AdminProposalFormComponent;
  let fixture: ComponentFixture<AdminProposalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProposalFormComponent],
    });
    fixture = TestBed.createComponent(AdminProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
