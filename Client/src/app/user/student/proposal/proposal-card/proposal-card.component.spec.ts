import { ComponentFixture, TestBed } from '@angular/core/testing';

import {StudentProposalCardComponent} from './proposal-card.component';


// @ts-ignore
describe('StudentProposalCardComponent', () => {
  let component: StudentProposalCardComponent;
  let fixture: ComponentFixture<StudentProposalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProposalCardComponent]
    })
        .compileComponents();

    fixture = TestBed.createComponent(StudentProposalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

