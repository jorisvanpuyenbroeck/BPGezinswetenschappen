import { Application } from './application';

export interface User {
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
  application?: Application;
  programType?: string;
  userLevel?: string;
  expertise?: string;
  token?: string;
  picture?: string;
  studentProjects?: null;
  coachProjects?: null;
  userTopics?: null;
}

export interface UserCreateDto {
  sub?: string;
  userName?: string;
  givenName?: string;
  familyName?: string;
  password?: string;
  email?: string;
  programType?: string;
  userLevel?: string;
  expertise?: string;
}

export interface UserReadDto {
  userId: number;
  userName: string;
  givenName: string;
  familyName: string;
  email: string;
  programType: string;
  userLevel: string;
  expertise: string;
}

export interface UserUpdateDto {
  userName?: string;
  givenName?: string;
  familyName?: string;
  password?: string;
  email?: string;
  programType?: string;
  userLevel?: string;
  expertise?: string;
}
