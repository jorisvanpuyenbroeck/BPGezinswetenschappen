import { Component, OnInit, ViewChild } from '@angular/core';
import { Topic } from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class AdminTopicListComponent implements OnInit {
  displayedColumns: string[] = ['topicId', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Topic>([]);
  topics$: Subscription = new Subscription();
  deleteTopic$: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private topicService: TopicService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTopics();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.topics$.unsubscribe();
    if (this.deleteTopic$) {
      this.deleteTopic$.unsubscribe();
    }
  }

  getTopics() {
    this.topics$ = this.topicService.getTopics().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (error) => {
        this.showNotification(
          'Error loading topics: ' + error.message,
          'error'
        );
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['admin/topic/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['admin/topic/form'], {
      state: { id: id, mode: 'edit' },
    });
  }
  delete(id: number) {
    this.deleteTopic$ = this.topicService.deleteTopic(id).subscribe({
      next: () => {
        this.getTopics();
        this.showNotification('Topic successfully deleted', 'success');
      },
      error: (error) => {
        this.showNotification(
          'Error deleting topic: ' + error.message,
          'error'
        );
      },
    });
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
