import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProposalListComponent } from './proposal-list.component';

describe('StudentProposalListComponent', () => {
  let component: StudentProposalListComponent;
  let fixture: ComponentFixture<StudentProposalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProposalListComponent]
    });
    fixture = TestBed.createComponent(StudentProposalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
