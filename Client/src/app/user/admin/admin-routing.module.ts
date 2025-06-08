import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTopicListComponent } from './topic/topic-list/topic-list.component';
import { AdminTopicFormComponent } from './topic/topic-form/topic-form.component';
import { AdminProposalListComponent } from './proposal/proposal-list/proposal-list.component';
import { AdminProposalFormComponent } from './proposal/proposal-form/proposal-form.component';
import { AdminOrganisationFormComponent } from './organisation/organisation-form/organisation-form.component';
import { AdminOrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { AdminProjectListComponent } from './project/project-list/project-list.component';
import { AdminUserListComponent } from './user/user-list/user-list.component';
// import { AdminUserFormComponent } from './user/user-form/user-form.component';
import { AdminHomeComponent } from './home/home.component';
import { AdminClassroomListComponent } from './classroom/classroom-list/classroom-list.component';
import { AdminClassroomFormComponent } from './classroom/classroom-form/classroom-form.component';
import { AdminYearListComponent } from './year/year-list/year-list.component';
import { AdminYearFormComponent } from './year/year-form/year-form.component';
import { AdminExamperiodListComponent } from './examperiod/examperiod-list/examperiod-list.component';
import { AdminExamperiodFormComponent } from './examperiod/examperiod-form/examperiod-form.component';
import { AdminPresentationListComponent } from './presentation/presentation-list/presentation-list.component';
import { AdminPresentationFormComponent } from './presentation/presentation-form/presentation-form.component';
import { AdminPresentationdayListComponent } from './presentationday/presentationday-list/presentationday-list.component';
import { AdminPresentationdayFormComponent } from './presentationday/presentationday-form/presentationday-form.component';
import { AdminSlotListComponent } from './slot/slot-list/slot-list.component';
import { AdminSlotFormComponent } from './slot/slot-form/slot-form.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent },
  { path: 'topic', component: AdminTopicListComponent },
  { path: 'topic/form', component: AdminTopicFormComponent },
  { path: 'proposal', component: AdminProposalListComponent },
  { path: 'proposal/form', component: AdminProposalFormComponent },
  { path: 'organisation', component: AdminOrganisationListComponent },
  { path: 'organisation/form', component: AdminOrganisationFormComponent },
  { path: 'project', component: AdminProjectListComponent },
  { path: 'project/form', component: AdminProjectListComponent },
  { path: 'user', component: AdminUserListComponent },
  { path: 'classroom', component: AdminClassroomListComponent },
  { path: 'classroom/form', component: AdminClassroomFormComponent },
  { path: 'year', component: AdminYearListComponent },
  { path: 'year/form', component: AdminYearFormComponent },
  { path: 'examperiod', component: AdminExamperiodListComponent },
  { path: 'examperiod/form', component: AdminExamperiodFormComponent },
  { path: 'presentation', component: AdminPresentationListComponent },
  { path: 'presentation/form', component: AdminPresentationFormComponent },
  { path: 'presentationday', component: AdminPresentationdayListComponent },
  {
    path: 'presentationday/form',
    component: AdminPresentationdayFormComponent,
  },
  { path: 'slot', component: AdminSlotListComponent },
  { path: 'slot/form', component: AdminSlotFormComponent },
  //  { path: 'user/form', component: AdminUserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
