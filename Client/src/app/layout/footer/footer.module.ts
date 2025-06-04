import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from './copyright/copyright.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [CopyrightComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ThemeToggleComponent,
  ],
  exports: [CopyrightComponent],
})
export class FooterModule {}
