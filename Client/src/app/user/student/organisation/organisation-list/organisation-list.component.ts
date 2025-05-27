import { Component, OnDestroy, OnInit } from '@angular/core';
import { Organisation } from '../../../../shared/models/organisation';
import { OrganisationService } from '../../../../shared/services/organisation.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.css'],
})
export class StudentOrganisationListComponent implements OnInit {
  //local
  // color: String = 'primary';
  organisations: Organisation[] = [];
  user: User = {} as User;

  // Subscriptions
  organisationSubscription: Subscription = new Subscription();
  userSubscription: Subscription = new Subscription();

  constructor(
    public organisationService: OrganisationService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.getOrganisations();
    this.userSubscription = this.userService.userStore$.subscribe((user) => {
      console.log('organisation component initialized');
      // Update the local student property
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.organisationSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getOrganisations() {
    this.organisationSubscription = this.organisationService
      .getOrganisations()
      .subscribe((result) => (this.organisations = result));
  }

  toggleFavourite(organisationId: number) {
    if (this.user.application) {
      // Ensure application is defined
      if (this.isFavourite(organisationId)) {
        // If the topic is already in the topics array, remove it
        const index =
          this.user.application.organisations.indexOf(organisationId);
        if (index !== -1) {
          this.user.application.organisations.splice(index, 1);
        }
      } else {
        // If the topic is not in the topics array, add it
        this.user.application.organisations.push(organisationId);
      }
    }
  }

  isFavourite(organisationId: number): boolean {
    return this.user.application?.organisations
      ? this.user.application.organisations.includes(organisationId)
      : false;
  }

  saveOrganisations() {
    if (this.userService.checkApplicationProgress(this.user, 'organisations')) {
      if (this.user.application) {
        // Ensure application is defined
        this.user.application.organisationsSaved = true;
      }
      console.log('saved', this.user || 'student triggered');
      // this.student$.subscribe(student => {
      //   this.topicService.saveTopics(student.application.topics);
    }
  }
}
