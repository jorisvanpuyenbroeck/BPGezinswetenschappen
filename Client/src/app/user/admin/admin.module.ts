import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminTopicListComponent } from './topic/topic-list/topic-list.component';
import { AdminTopicFormComponent } from './topic/topic-form/topic-form.component';
import { AdminProposalListComponent } from './proposal/proposal-list/proposal-list.component';
import { AdminProposalFormComponent } from './proposal/proposal-form/proposal-form.component';
import { CommonModule } from '@angular/common';
import { AdminOrganisationFormComponent } from './organisation/organisation-form/organisation-form.component';
import { AdminOrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { AdminProjectFormComponent } from './project/project-form/project-form.component';
import { AdminProjectListComponent } from './project/project-list/project-list.component';
import { LayoutModule } from '../../layout/layout.module';
import { AdminHomeComponent } from './home/home.component';
import { AdminUserListComponent } from './user/user-list/user-list.component';
import { AdminClassroomListComponent } from './classroom/classroom-list/classroom-list.component';
import { AdminClassroomFormComponent } from './classroom/classroom-form/classroom-form.component';
import { AdminYearListComponent } from './year/year-list/year-list.component';
import { AdminYearFormComponent } from './year/year-form/year-form.component';
import { AdminExamperiodListComponent } from './examperiod/examperiod-list/examperiod-list.component';
import { AdminExamperiodFormComponent } from './examperiod/examperiod-form/examperiod-form.component';
import { AdminPresentationListComponent } from './presentation/presentation-list/presentation-list.component';
import { AdminPresentationFormComponent } from './presentation/presentation-form/presentation-form.component';
import { PresentationdayListComponent } from './presentationday/presentationday-list/presentationday-list.component';
import { PresentationdayFormComponent } from './presentationday/presentationday-form/presentationday-form.component';
import { SlotListComponent } from './slot/slot-list/slot-list.component';
import { SlotFormComponent } from './slot/slot-form/slot-form.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminTopicListComponent,
    AdminTopicFormComponent,
    AdminProposalListComponent,
    AdminProposalFormComponent,
    AdminOrganisationFormComponent,
    AdminOrganisationListComponent,
    AdminProjectFormComponent,
    AdminProjectListComponent,
    AdminUserListComponent,
    AdminClassroomListComponent,
    AdminClassroomFormComponent,
    AdminYearListComponent,
    AdminYearFormComponent,
    AdminExamperiodListComponent,
    AdminExamperiodFormComponent,
    AdminPresentationListComponent,
    AdminPresentationFormComponent,
    PresentationdayListComponent,
    PresentationdayFormComponent,
    SlotListComponent,
  ],
  imports: [SharedModule, LayoutModule, SlotFormComponent],
  exports: [
    AdminHomeComponent,
    AdminTopicListComponent,
    AdminTopicFormComponent,
    AdminProposalListComponent,
    AdminProposalFormComponent,
    AdminOrganisationFormComponent,
    AdminOrganisationListComponent,
    AdminProjectFormComponent,
    AdminProjectListComponent,
    AdminUserListComponent,
    AdminClassroomListComponent,
    AdminClassroomFormComponent,
    AdminYearListComponent,
    AdminYearFormComponent,
    AdminExamperiodListComponent,
    AdminExamperiodFormComponent,
    AdminPresentationListComponent,
    AdminPresentationFormComponent,
    PresentationdayListComponent,
    PresentationdayFormComponent,
    SlotListComponent,
    SlotFormComponent,
  ],
})
export class AdminModule {}
