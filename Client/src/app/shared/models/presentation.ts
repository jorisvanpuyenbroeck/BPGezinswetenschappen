import { Slot } from './slot';
import { User, UserReadDto } from './user';

// Note: To avoid circular reference issues, use 'any' for User and PresentationSlot for now.
export interface Presentation {
  presentationId: number;
  studentId: number;
  student: User;
  coachId: number;
  coach: User;
  expertId?: number;
  expert?: User;
  slots: Slot[];
}
