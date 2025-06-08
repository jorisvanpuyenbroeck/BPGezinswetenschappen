import { PresentationDay } from './presentationday';
import { Classroom } from './classroom';
import { Presentation } from './presentation';

// Note: To avoid circular reference issues, use 'any' for related types for now.
export interface Slot {
  slotId: number;
  startTime: string; // Use string for TimeOnly (e.g. 'HH:mm:ss')
  endTime: string; // Use string for TimeOnly
  presentationDayId?: number;
  presentationDay?: any;
  classroomId?: number;
  classroom?: Classroom;
  presentations: Presentation[];
  availabilities: any[];
}
