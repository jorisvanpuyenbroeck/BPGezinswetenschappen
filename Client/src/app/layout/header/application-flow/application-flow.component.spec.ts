import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFlowComponent } from './application-flow.component';

describe('ApplicationFlowComponent', () => {
  let component: ApplicationFlowComponent;
  let fixture: ComponentFixture<ApplicationFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationFlowComponent]
    });
    fixture = TestBed.createComponent(ApplicationFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
