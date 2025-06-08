import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Topic } from '../../../../shared/models/topic';
import { TopicService } from '../../../../shared/services/topic.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenericListComponent } from '../../../../shared/layout/generic-list/generic-list.component';

@Component({
  selector: 'app-admin-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class AdminTopicListComponent implements OnInit, OnDestroy {
  // List configuration
  allColumns: string[] = ['topicId', 'name', 'description', 'actions'];
  hideableColumns: string[] = ['description']; // Columns that will be hidden on small screens
  dataSource = new MatTableDataSource<Topic>([]);
  topics$: Subscription = new Subscription();
  deleteTopic$: Subscription = new Subscription();

  @ViewChild(GenericListComponent) genericList!: GenericListComponent;
  constructor(
    private topicService: TopicService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTopics();
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
          'Close'
        );
      },
    });
  } // Handle events from generic list component
  onAdd() {
    this.router.navigate(['admin/topic/form'], { state: { mode: 'add' } });
  }

  onEdit(topic: Topic) {
    this.router.navigate(['admin/topic/form'], {
      state: { id: topic.topicId, mode: 'edit' },
    });
  }

  onDelete(topic: Topic) {
    this.deleteTopic$ = this.topicService.deleteTopic(topic.topicId).subscribe({
      next: () => {
        this.getTopics();
        this.showNotification('Topic successfully deleted', 'Close');
      },
      error: (error) => {
        this.showNotification(
          'Error deleting topic: ' + error.message,
          'Close'
        );
      },
    });
  }

  showNotification(message: string, action: string = 'Close') {
    this.genericList?.showNotification(message, action);
  }
}
