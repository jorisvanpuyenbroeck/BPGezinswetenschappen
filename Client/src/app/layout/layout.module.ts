import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterModule} from "./footer/footer.module";
import {HeaderModule} from "./header/header.module";
import {MaterialModule} from "./material/material.module";
import {ModalsModule} from "./modals/modals.module";
import {BodyModule} from "./body/body.module";



@NgModule({
  declarations: [],
  imports: [
    FooterModule,
    HeaderModule,
    MaterialModule,
    ModalsModule
  ],
exports: [
    FooterModule,
    HeaderModule,
    MaterialModule,
    ModalsModule
  ]
})
export class LayoutModule { }
