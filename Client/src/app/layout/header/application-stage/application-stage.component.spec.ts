import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStageComponent } from './application-stage.component';

describe('ApplicationStageComponent', () => {
  let component: ApplicationStageComponent;
  let fixture: ComponentFixture<ApplicationStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationStageComponent]
    });
    fixture = TestBed.createComponent(ApplicationStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
