import { Component } from '@angular/core';
import { UserService } from '../../../user/user.service';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-project-requirements',
  templateUrl: './project-requirements.component.html',
  styleUrls: ['./project-requirements.component.css']
})
export class ProjectRequirementsComponent {

  canActivateProject: boolean = false;

  constructor(public userService: UserService, private router: Router, private location: Location) {
  }

  closeModal() {
    this.location.back();
  }

  // other component logic...

}
