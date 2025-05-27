import { Slot } from './slot';

// Note: To avoid circular reference issues, use 'any' for ExamPeriod and Slot for now.
export interface PresentationDay {
  presentationDayId: number;
  date: string; // ISO string for Date
  examPeriodId: number;
  examPeriod: any;
  slots: Slot[];
}
