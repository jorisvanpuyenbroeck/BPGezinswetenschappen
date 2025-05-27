// Note: To avoid circular reference issues, use 'any' for ExamPeriod for now.
export interface Year {
  yearId: number;
  label: string;
  examPeriods: any[];
}
