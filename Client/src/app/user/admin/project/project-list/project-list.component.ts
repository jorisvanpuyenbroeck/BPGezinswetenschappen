import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../shared/services/project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Topic } from '../../../../shared/models/topic';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class AdminProjectListComponent implements OnInit {
  projects: Project[] = [];
  projectsSubscription: Subscription = new Subscription();
  deleteProjectSubscription: Subscription = new Subscription();
  errorMessage: string = '';

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
  }

  getProjects() {
    this.projectsSubscription = this.projectService
      .getProjects()
      .subscribe((result) => (this.projects = result));
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/project/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/project/form'], {
      state: { id: id, mode: 'edit' },
    });
  }

  delete(id: number) {
    this.deleteProjectSubscription = this.projectService.deleteProject(id).subscribe({
      next: (v) => this.getProjects(),
      error: (e) => (this.errorMessage = e.message),
    });
  }

  getNames(topics: Topic[]) {
    return topics.map((t) => t.name).join(', ');
  }
}
