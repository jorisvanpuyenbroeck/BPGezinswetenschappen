import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProposalListComponent } from './proposal/proposal-list/proposal-list.component';
import { StudentOrganisationListComponent } from "./organisation/organisation-list/organisation-list.component";
import { StudentTopicListComponent} from "./topic/topic-list/topic-list.component";
import {StudentHomeComponent} from "./home/home.component";
import {StudentProjectFormComponent} from "./project/project-form/project-form.component";

const routes: Routes = [
  { path: '', component: StudentHomeComponent},
  { path: 'topics', component: StudentTopicListComponent },
  { path: 'proposals', component: StudentProposalListComponent },
  { path: 'organisations', component: StudentOrganisationListComponent },
  { path: 'project', component: StudentProjectFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
