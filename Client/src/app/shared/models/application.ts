import {Topic} from "./topic";
import {Organisation} from "./organisation";
import {Proposal} from "./proposal";
import {Project} from "./project";

export interface Application {
  topics: number[];
  topicsSaved: boolean;
  organisations: number[];
  organisationsSaved: boolean;
  proposals: number[];
  proposalsSaved: boolean;
  project: number;
  projectSaved: boolean;
}
