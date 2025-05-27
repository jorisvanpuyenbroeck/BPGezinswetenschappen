import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from "./user-store";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserStore,
    // other stores...
  ]
})
export class StoreModule { }
