import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { AuthService } from '@auth0/auth0-angular';
import { StudentModule } from './student/student.module';
import { MentorModule } from './mentor/mentor.module';
import { CoachModule } from './coach/coach.module';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    StudentModule,
    MentorModule,
    CoachModule,
    AdminModule,
    SharedModule,
  ],
  exports: [
    StudentModule,
    MentorModule,
    CoachModule,
    AdminModule,
    HomeComponent,
  ],
  providers: [UserService, RoleService, AuthService],
})
export class UserModule {}
//
