import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOrganisationListComponent } from './organisation-list.component';

describe('StudentOrganisationListComponent', () => {
  let component: StudentOrganisationListComponent;
  let fixture: ComponentFixture<StudentOrganisationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentOrganisationListComponent]
    });
    fixture = TestBed.createComponent(StudentOrganisationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
