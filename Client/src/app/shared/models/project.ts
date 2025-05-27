import { User } from './user';
import { Proposal } from './proposal';
import { Topic } from './topic';
import { Organisation } from './organisation';

export interface Project {
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  stage: string;
  active: boolean;
  supported: boolean;
  reviewed: boolean;
  approved: boolean;
  feedback: string;
  studentId: number;
  coachId: number;
  organisationId: number;
  proposalId: number;
  student: User;
  coach: User;
  organisation: Organisation;
  proposal: Proposal;
  topics: Topic[];
}

export interface ProjectCreateDto {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  studentId: number;
  organisationId: number;
  proposalId: number;
  topics: Topic[];
  stage: string;
  active: boolean;
}

export interface ProjectReadDto {
  projectId: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  stage: string;
  active: boolean;
  supported: boolean;
  reviewed: boolean;
  approved: boolean;
  feedback: string;
  studentId: number;
  coachId: number;
  organisationId: number;
  proposalId: number;
}

export interface ProjectUpdateDto {
  title?: string;
  description?: string;
  stage?: string;
  active?: boolean;
  supported?: boolean;
  reviewed?: boolean;
  approved?: boolean;
  feedback?: string;
  studentId?: number;
  coachId?: number;
  organisationId?: number;
  proposalId?: number;
  topicIds?: number[];
}
