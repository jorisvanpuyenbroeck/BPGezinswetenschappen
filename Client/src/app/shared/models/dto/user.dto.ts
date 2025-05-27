import {Application} from "../application";

export interface UserDto {
    sub?: string;
    userId?: number;
    userName?: string;
    givenName?: string;
    familyName?: string;
    name?: string;
    nickname?: string;
    password?: string;
    email?: string;
    emailVerified?: boolean;
    // application: string; // don't submit the application information when a student is created
    programType?: string;
    userLevel?: string;
    expertise?: string;
    token?: string;
    picture?: string;
    studentProjects?: null;
    coachProjects?: null;
    userTopics?: null;
}
