import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MaterialModule } from './material/material.module';
import { ModalsModule } from './modals/modals.module';
import { SidenavModule } from './sidenav/sidenav.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    MaterialModule,
    ModalsModule,
    SidenavModule,
  ],
  exports: [
    FooterModule,
    HeaderModule,
    MaterialModule,
    ModalsModule,
    SidenavModule,
  ],
})
export class LayoutModule {}
