import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorOrganisationFormComponent } from './organisation-form/organisation-form.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'organisation/form', component: MentorOrganisationFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
