export interface SummaryCategoryModel {
  name: string;
  count: number | undefined;
}

export interface AttendanceSummaryModel {
  date: string;
  summary: {  
    attendees: {
      total: number;
      categories: SummaryCategoryModel[];
    },
    vips: {
      total: number;
      categories: SummaryCategoryModel[];
    },
    totalAttendees: number;
  }
}