import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentProposalListComponent } from './proposal/proposal-list/proposal-list.component';
import { StudentTopicListComponent } from './topic/topic-list/topic-list.component';
import { StudentOrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { StudentProjectFormComponent } from "./project/project-form/project-form.component";
import { StudentProposalCardComponent} from "./proposal/proposal-card/proposal-card.component";
import {LayoutModule} from "../../layout/layout.module";
import {StudentHomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    StudentHomeComponent,
    StudentProposalListComponent,
    StudentTopicListComponent,
    StudentOrganisationListComponent,
    StudentProjectFormComponent,
    StudentProposalListComponent,
    StudentTopicListComponent,
    StudentProposalCardComponent
  ],
  imports: [
    SharedModule,
    LayoutModule
  ],
  exports: [
    StudentHomeComponent,
    StudentProposalListComponent,
    StudentTopicListComponent,
    StudentOrganisationListComponent,
    StudentProjectFormComponent,
    StudentProposalListComponent,
    StudentTopicListComponent,
    StudentProposalCardComponent
  ],
})
export class StudentModule {}
