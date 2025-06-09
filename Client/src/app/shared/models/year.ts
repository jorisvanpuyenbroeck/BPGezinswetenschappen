// Note: To avoid circular reference issues, use 'any' for ExamPeriod for now.
export interface Year {
  yearId: number;
  label: string;
  examPeriods: any[];
}

export interface YearCreateDto {
  label: string;
}

export interface YearUpdateDto {
  label: string;
}
