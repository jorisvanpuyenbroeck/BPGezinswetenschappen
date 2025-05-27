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
