import { Injectable, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserStore } from '../store/user-store';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, first, take, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserCreateDto, UserUpdateDto } from '../shared/models/user';
import { Application } from '../shared/models/application';
import { RoleService } from './role.service';
import { ApiConfigService } from '../app.config'; // Import the config service

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // local
  public userStore$: Observable<User> = new BehaviorSubject<User>({} as User);
  user: User = {} as User;
  userStore: UserStore = new UserStore();
  private readonly baseUrl: string;
  private readonly usersEndpoint = 'users'; // API endpoint (relative path)

  //Signals https://angular.dev/guide/signals
  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isCoach = signal(false);
  isStudent = signal(false);
  isMentor = signal(false);

  // Subscription
  userSubscription: Subscription = new Subscription();
  hasApplicationTopics: boolean = false;
  hasApplicationOrganisations: boolean = false;
  hasApplicationProposals: boolean = false;
  hasApplicationProject: boolean = false;
  hasApplicationOneOrganisation: boolean = false;
  hasApplicationOneProposal: boolean = false;
  canProposeProject: boolean = false;
  constructor(
    private auth: AuthService,
    private roleService: RoleService,
    userStore: UserStore,
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    console.log('user service constructor');
    this.updateUserState();
    this.baseUrl = this.apiConfigService.apiBaseUrl; // Get the base URL from ApiConfigService

    auth.isAuthenticated$.subscribe((auth) => {
      this.isAuthenticated.set(auth);
    });
    roleService.hasPermission('isAdmin').subscribe((admin) => {
      this.isAdmin.set(admin);
    });
    roleService.hasPermission('isCoach').subscribe((coach) => {
      this.isCoach.set(coach);
    });
    roleService.hasPermission('isStudent').subscribe((student) => {
      this.isStudent.set(student);
    });
    roleService.hasPermission('isMentor').subscribe((mentor) => {
      this.isMentor.set(mentor);
    });
  }
  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  updateUserState(): void {
    console.log('trying to update student state');
    this.userStore$ = this.userStore.select((state) => state);
    this.userSubscription = this.userStore$.subscribe((user) => {
      this.user = user;
    });
    this.auth.user$
      .pipe(
        take(1),
        map((user) => {
          if (user && user.sub) {
            // Update the student state
            this.userStore.setUser({
              sub: user.sub,
              name: user.name,
              email: user.email,
              picture: user.picture,
              givenName: user.given_name,
              familyName: user.family_name,
              nickname: user.nickname,
              emailVerified: user.email_verified,
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
              // map other properties...
            });
          }
        })
      )
      .subscribe();
  }

  userExists(sub: string): Observable<boolean> {
    console.log('trying to check if student exists:', sub);
    // return this.http.get<boolean>(`https://localhost:7026/api/Users/sub/${sub}`);
    return this.http.get<boolean>(`${this.baseUrl}Users/sub/${sub}`); // Use base URL dynamically
  }

  createUser(user: User): Observable<any> {
    const userDto = this.mapUserToUserDto(user);
    console.log('trying to post student:', userDto);
    // return this.http.post('https://localhost:7026/api/Users/', userDto);
    return this.http.post(`${this.apiConfigService.apiBaseUrl}Users/`, userDto);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.apiConfigService.apiBaseUrl}${this.usersEndpoint}`;
    return this.http
      .get<User[]>(url)
      .pipe(tap((users) => console.log('Fetched users:', users)));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(
      `${this.apiConfigService.apiBaseUrl}Users/${userId}`
    );
  }

  setUser(user: User) {
    this.userStore.setUser(user);
  }

  checkApplicationProgress(user: User, phase: string) {
    const application = user.application;
    if (!application) {
      return false; // Return false if application is undefined
    }

    this.hasApplicationTopics = application.topics.length > 0;
    this.hasApplicationOrganisations = application.organisations.length > 0;
    this.hasApplicationProposals = application.proposals.length > 0;
    this.hasApplicationProject = application.project > 0;
    this.hasApplicationOneOrganisation = application.organisations.length === 1;
    this.hasApplicationOneProposal = application.proposals.length === 1;

    this.canProposeProject =
      this.hasApplicationTopics &&
      this.hasApplicationOneOrganisation &&
      this.hasApplicationOneProposal;

    switch (phase) {
      case 'topics':
        return this.hasApplicationTopics;
      case 'organisations':
        return this.hasApplicationOrganisations;
      case 'proposals':
        return this.hasApplicationProposals;
      case 'canProposeProject':
        return this.canProposeProject;
      case 'project':
        return this.hasApplicationProject;
      default:
        return false;
    }
  }
  mapUserToUserDto(user: User): UserCreateDto {
    const { application, ...userDto } = user;
    return userDto;
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(
        `${this.apiConfigService.apiBaseUrl}${this.usersEndpoint}/${id}`
      )
      .pipe(tap((user) => console.log('Fetched user:', user)));
  }

  updateUser(id: number, updateDto: UserUpdateDto): Observable<any> {
    return this.http.put(
      `${this.apiConfigService.apiBaseUrl}${this.usersEndpoint}/${id}`,
      updateDto
    );
  }
}
