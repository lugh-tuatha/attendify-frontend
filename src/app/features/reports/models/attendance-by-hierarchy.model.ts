export interface AttendanceByHierarchyModel {
  id: string;
  firstName: string;
  lastName: string;
  attendance: {
    timeIn: Date;
    isLate: boolean
  }[]
}