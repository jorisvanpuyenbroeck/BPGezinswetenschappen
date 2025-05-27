import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {AdminModule} from "../../user/admin/admin.module";
import {StudentModule} from "../../user/student/student.module";
import {CoachModule} from "../../user/coach/coach.module";
import {MentorModule} from "../../user/mentor/mentor.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AdminModule,
    StudentModule,
    CoachModule,
    MentorModule
  ],
    exports: [HomeComponent]
})
export class BodyModule { }
