import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationdayFormComponent } from './presentationday-form.component';

describe('PresentationdayFormComponent', () => {
  let component: PresentationdayFormComponent;
  let fixture: ComponentFixture<PresentationdayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationdayFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
