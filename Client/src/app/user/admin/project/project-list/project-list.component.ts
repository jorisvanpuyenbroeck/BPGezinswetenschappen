import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../shared/services/project.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Topic } from '../../../../shared/models/topic';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class AdminProjectListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ['projectId', 'title', 'description', 'actions'];
  hideableColumns: string[] = ['description']; // Hide description on small screens
  dataSource = new MatTableDataSource<Project>([]);

  // Subscriptions
  projectsSubscription: Subscription = new Subscription();
  deleteProjectSubscription: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
    if (this.deleteProjectSubscription) {
      this.deleteProjectSubscription.unsubscribe();
    }
  }

  getProjects() {
    this.projectsSubscription = this.projectService.getProjects().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification(
          'Failed to load projects: ' + error.message,
          'Close'
        );
        console.error('Error loading projects:', error);
      },
    });
  }

  // Event handlers for generic list component
  onAdd() {
    this.router.navigate(['admin/project/form'], { state: { mode: 'add' } });
  }

  onEdit(project: Project) {
    this.router.navigate(['admin/project/form'], {
      state: { id: project.projectId, mode: 'edit' },
    });
  }

  onDelete(project: Project) {
    this.deleteProjectSubscription = this.projectService
      .deleteProject(project.projectId)
      .subscribe({
        next: () => {
          this.getProjects();
          this.showNotification('Project successfully deleted', 'Close');
        },
        error: (error) => {
          this.showNotification(
            'Error deleting project: ' + error.message,
            'Close'
          );
        },
      });
  }

  getTopicNames(topics: Topic[]) {
    return topics.map((t) => t.name).join(', ');
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
