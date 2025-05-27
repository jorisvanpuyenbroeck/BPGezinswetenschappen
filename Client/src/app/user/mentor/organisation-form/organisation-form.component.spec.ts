import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorOrganisationFormComponent } from './organisation-form.component';

describe('OrganisationFormComponent', () => {
  let component: MentorOrganisationFormComponent;
  let fixture: ComponentFixture<MentorOrganisationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorOrganisationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MentorOrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
