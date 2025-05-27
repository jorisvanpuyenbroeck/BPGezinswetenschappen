import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
  ],
  exports: [
    MatCardModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export class MaterialModule { }
