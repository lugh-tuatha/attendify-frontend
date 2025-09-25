export interface RegisterAttendeeDto {
  eventId: string;
  attendeeId?: string;
  firstName?: string;
  lastName?: string;
  primaryLeader?: string;
  churchHierarchy?: string;
  memberStatus?: string;
}
