import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationFormComponent } from './organisation-form.component';

describe('AdminOrganisationFormComponent', () => {
  let component: AdminOrganisationFormComponent;
  let fixture: ComponentFixture<AdminOrganisationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationFormComponent]
    });
    fixture = TestBed.createComponent(AdminOrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
