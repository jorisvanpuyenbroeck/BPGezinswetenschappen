import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TruncatePipe } from '../pipes/truncate.pipe';

// Import all layout components
import { GenericListComponent } from './generic-list/generic-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';

// Import body components
import { HomeComponent } from '../../user/home/home.component';

// Import header components
import { ApplicationFlowComponent } from './header/application-flow/application-flow.component';
import { ApplicationStageComponent } from './header/application-stage/application-stage.component';
import { LoginButtonComponent } from './header/login-button/login-button.component';
import { LogoutButtonComponent } from './header/logout-button/logout-button.component';
import { MenuComponent } from './header/menu/menu.component';
import { SignupButtonComponent } from './header/signup-button/signup-button.component';

// Import modal components
import { ProjectRequirementsComponent } from './modals/project-requirements/project-requirements.component';

@NgModule({
  declarations: [
    // Main layout components
    GenericListComponent,
    SidenavComponent,

    // Header components
    ApplicationFlowComponent,
    ApplicationStageComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    MenuComponent,
    SignupButtonComponent,

    // Modal components
    ProjectRequirementsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TruncatePipe, // Add the standalone pipe to the imports
  ],
  exports: [
    // Main layout components
    GenericListComponent,
    SidenavComponent,

    // Header components
    ApplicationFlowComponent,
    ApplicationStageComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    MenuComponent,
    SignupButtonComponent,

    // Modal components
    ProjectRequirementsComponent,
  ],
})
export class LayoutModule {}
