import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CopyrightComponent} from "./copyright/copyright.component";



@NgModule({
  declarations: [CopyrightComponent],
  imports: [
    CommonModule,
  ],
  exports: [CopyrightComponent]
})
export class FooterModule { }
