export interface CheckInAttendeeDto {
  eventRegistrationId: string;
  timeIn: Date;
  weekNumber: number;
  attendanceTypeId: string;
  organizationId: string;
}
