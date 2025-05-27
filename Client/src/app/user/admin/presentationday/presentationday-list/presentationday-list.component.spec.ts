import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationdayListComponent } from './presentationday-list.component';

describe('PresentationdayListComponent', () => {
  let component: PresentationdayListComponent;
  let fixture: ComponentFixture<PresentationdayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationdayListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentationdayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
