import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRequirementsComponent} from "./project-requirements/project-requirements.component";



@NgModule({
  declarations: [ProjectRequirementsComponent],
  imports: [
    CommonModule
  ],
    exports: [ProjectRequirementsComponent]
})
export class ModalsModule { }
