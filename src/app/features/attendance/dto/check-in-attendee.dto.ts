export interface CheckInAttendeeDto {
  eventRegistrationId?: string;
  isLate: boolean;
  attendeeId: string;
  eventId: string;
  organizationId: string;
}