import { ComponentStore } from '@ngrx/component-store';
import { User } from '../shared/models/user';
import { Injectable } from '@angular/core';
import { Application } from '../shared/models/application';

@Injectable()
export class UserStore extends ComponentStore<User> {
  constructor() {
    super({
      sub: '',
      coachProjects: null,
      expertise: '',
      givenName: '',
      familyName: '',
      nickname: '',
      password: '',
      picture: '',
      application: {
        topics: [],
        organisations: [],
        proposals: [],
        project: 0,
        topicsSaved: false,
        organisationsSaved: false,
        proposalsSaved: false,
        projectSaved: false,
      } as Application,
      programType: '',
      studentProjects: null,
      token: '',
      userId: 0,
      userLevel: '',
      userName: '',
      userTopics: null,
      name: '',
      email: '',
      emailVerified: false,
    });
  }

  // Define a setter method for updating the student state
  readonly setUser = this.updater((state, user: User) => {
    return { ...state, ...user };
  });

  readonly selectTopics = this.select(
    (state) => state.application?.topics || [] // Ensure topics is defined or return an empty array
  );
}
