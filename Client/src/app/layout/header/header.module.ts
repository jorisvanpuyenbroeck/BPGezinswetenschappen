import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationFlowComponent } from './application-flow/application-flow.component';
import { ApplicationStageComponent } from './application-stage/application-stage.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../layout.module';
import { AppRoutingModule } from '../../app-routing.module';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    ApplicationFlowComponent,
    ApplicationStageComponent,
    LoginButtonComponent,
    MenuComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    ApplicationFlowComponent,
    ApplicationStageComponent,
    LoginButtonComponent,
    MenuComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
  ],
})
export class HeaderModule {}
