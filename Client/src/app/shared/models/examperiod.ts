// Note: To avoid circular reference issues, import Year and PresentationDay only where needed.

export interface ExamPeriod {
  examPeriodId: number;
  name: string;
  yearId: number;
  year: any; // Use 'any' to avoid circular reference for now
  presentationDays?: any[]; // Use 'any[]' to avoid circular reference for now
}
