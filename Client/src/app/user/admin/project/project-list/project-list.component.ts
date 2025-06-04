import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class AdminProjectListComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  projectsSubscription: Subscription = new Subscription();
  deleteProjectSubscription: Subscription = new Subscription();
  errorMessage: string = '';

  displayedColumns: string[] = ['projectId', 'title', 'description', 'actions'];
  dataSource = new MatTableDataSource<Project>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.projectsSubscription.unsubscribe();
    if (this.deleteProjectSubscription) {
      this.deleteProjectSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProjects() {
    this.projectsSubscription = this.projectService.getProjects().subscribe({
      next: (result) => {
        this.projects = result;
        this.dataSource.data = this.projects;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load projects. Please try again later.';
        console.error('Error loading projects:', error);
      },
    });
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
    this.deleteProjectSubscription = this.projectService
      .deleteProject(id)
      .subscribe({
        next: (v) => this.getProjects(),
        error: (e) => (this.errorMessage = e.message),
      });
  }

  getNames(topics: Topic[]) {
    return topics.map((t) => t.name).join(', ');
  }
}
