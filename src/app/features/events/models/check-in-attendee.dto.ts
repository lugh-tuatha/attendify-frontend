export interface CheckInAttendeeDto {
  eventRegistrationId: string;
  attendeeId: string;
  eventId: string;
  timeIn: Date;
  weekNumber: number;
  organizationId: string;
}