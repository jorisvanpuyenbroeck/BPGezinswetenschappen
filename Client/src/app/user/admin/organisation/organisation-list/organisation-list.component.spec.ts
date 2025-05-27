import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganisationListComponent } from './organisation-list.component';

describe('OrganisationComponent', () => {
  let component: AdminOrganisationListComponent;
  let fixture: ComponentFixture<AdminOrganisationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrganisationListComponent],
    });
    fixture = TestBed.createComponent(AdminOrganisationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
