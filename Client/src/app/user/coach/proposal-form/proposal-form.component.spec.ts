import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProposalFormComponent } from './proposal-form.component';

describe('CoachProposalFormComponent', () => {
  let component: CoachProposalFormComponent;
  let fixture: ComponentFixture<CoachProposalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachProposalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
