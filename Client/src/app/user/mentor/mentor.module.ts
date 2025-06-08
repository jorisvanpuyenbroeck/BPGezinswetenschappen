import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorHomeComponent } from './home/home.component';
import { MentorOrganisationFormComponent } from './organisation-form/organisation-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MentorHomeComponent, MentorOrganisationFormComponent],
  imports: [CommonModule, SharedModule],
  exports: [MentorHomeComponent, MentorOrganisationFormComponent],
})
export class MentorModule {}
