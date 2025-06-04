import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from '../material/material.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, RouterModule, MaterialModule, HeaderModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
