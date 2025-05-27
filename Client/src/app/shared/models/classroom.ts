import { Slot } from './slot';

export interface Classroom {
  classroomId: number;
  name: string;
  level?: string;
  slots: Slot[];
}
