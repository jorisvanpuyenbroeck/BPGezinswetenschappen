import {Topic} from "../topic";

export interface ProjectDto {
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
