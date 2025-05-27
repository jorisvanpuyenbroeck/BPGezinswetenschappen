import { NgModule } from '@angular/core';
import {UserService} from "./user.service";
import {RoleService} from "./role.service";
import {AuthService} from "@auth0/auth0-angular";
import {StudentModule} from "./student/student.module";
import {MentorModule} from "./mentor/mentor.module";
import {CoachModule} from "./coach/coach.module";
import {AdminModule} from "./admin/admin.module";

@NgModule({
  imports : [
    StudentModule,
    MentorModule,
    CoachModule,
    AdminModule
  ],
  exports : [
    StudentModule,
    MentorModule,
    CoachModule,
    AdminModule
  ],
  providers: [
    UserService, RoleService, AuthService
  ],

})
export class UserModule { }
