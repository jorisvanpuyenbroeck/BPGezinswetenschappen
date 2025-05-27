import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoachHomeComponent} from "./home/home.component";
import {CoachProposalFormComponent} from "./proposal-form/proposal-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {MentorModule} from "../mentor/mentor.module";



@NgModule({
  declarations: [CoachHomeComponent, CoachProposalFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        MentorModule,
    ],
    exports: [
        CoachHomeComponent,
        CoachProposalFormComponent]
})
export class CoachModule { }
