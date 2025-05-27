import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../shared/services/project.service';
import { TopicService } from '../../../../shared/services/topic.service';
import { Topic } from '../../../../shared/models/topic';
import { Location } from '@angular/common';
import {User} from "../../../../shared/models/user";
import {Organisation} from "../../../../shared/models/organisation";
import {Proposal} from "../../../../shared/models/proposal";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class AdminProjectFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  projectId: number = 0;
  origins: string[] = ['student', 'docent', 'werkveld'];
  allTopics: Topic[] = [];

  project: Project = {
    projectId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    description: '',
    stage: '',
    active: false,
    supported: false,
    reviewed: false,
    approved: false,
    feedback: '',
    studentId: 0,
    coachId: 0,
    organisationId: 0,
    proposalId: 0,
    student: {} as User,
    coach: {} as User,
    organisation: {} as Organisation,
    proposal: {} as Proposal,
    topics: [],
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  projectSubscription: Subscription = new Subscription();
  postProjectSubscription: Subscription = new Subscription();
  putProjectSubscription: Subscription = new Subscription();
  allTopicsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private topicService: TopicService,
    private location: Location
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.projectId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.projectId != null && this.projectId > 0) {
      this.projectSubscription = this.projectService
        .getProjectById(this.projectId)
        .subscribe((result) => (this.project = result));

      // console.log(this.project);
    }

    this.allTopicsSubscription = this.topicService.getTopics().subscribe((result) => {
      this.allTopics = result.map((t) => t);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.postProjectSubscription.unsubscribe();
    this.putProjectSubscription.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postProjectSubscription = this.projectService
        .postProjectAsAdmin(this.project)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/project'),
          error: (e) => (this.errorMessage = e.message),
        });
    }
    if (this.isEdit) {
      // console.log(this.project);
      this.putProjectSubscription = this.projectService
        .putProjectAsAdmin(this.projectId, this.project)
        .subscribe({
          next: (v) => this.router.navigateByUrl('/admin/project'),
          error: (e) => (this.errorMessage = e.message),
        });
      //console.log(this.project);
    }
  }

  goBack() {
    this.location.back();
  }

}
