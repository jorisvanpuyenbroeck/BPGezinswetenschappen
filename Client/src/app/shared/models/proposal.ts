import { Topic } from './topic';
import { User } from './user';
import { Project } from './project';

export interface Proposal {
  proposalId: number;
  title: string;
  description: string;
  origin?: string;
  topics?: Topic[];
}

export interface ProposalCreateDto {
  title: string;
  description: string;
  origin?: string;
  topicIds?: number[];
}

export interface ProposalReadDto {
  proposalId: number;
  title: string;
  description: string;
  origin?: string;
  topics?: Topic[];
}

export interface ProposalUpdateDto {
  title?: string;
  description?: string;
  origin?: string;
  topicIds?: number[];
}
