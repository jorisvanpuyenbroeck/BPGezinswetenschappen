import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CoachProposalFormComponent} from "./proposal-form/proposal-form.component";
import {HomeComponent} from "../../layout/body/home/home.component";

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'proposal/form', component: CoachProposalFormComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachRoutingModule {}
