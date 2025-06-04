import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '../store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicService } from './services/topic.service';
import { OrganisationService } from './services/organisation.service';
import { ProposalService } from './services/proposal.service';
import { ProjectService } from './services/project.service';
import { UserService } from '../user/user.service';
import { MaterialModule } from '../layout/material/material.module';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [TruncatePipe],
  imports: [
    StoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  exports: [
    StoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    TruncatePipe,
  ],
  providers: [
    TopicService,
    OrganisationService,
    ProposalService,
    ProjectService,
    UserService,
  ],
})
export class SharedModule {}
