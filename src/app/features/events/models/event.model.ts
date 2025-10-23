export interface LTHMIAttendeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  cellLeader: string | null;
  memberStatus: string | null;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  attendeeId: string;
  invitedBy: string;
  createdAt: string;
  updatedAt: string;
  attendee: LTHMIAttendeeProfile;
}

export interface AttendanceRecord {
  id: string;
  timeIn: string;
  timeOut: string | null;
  presenceDuration: number | null;
  weekNumber: number;
  createdAt: string;
  updatedAt: string;
  attendeeId: string;
  eventRegistrationId: string;
  eventId: string;
  organizationId: string;
  attendee: LTHMIAttendeeProfile;
  eventRegistration: EventRegistration;
}

export interface EventModel {
  id: string;
  name: string;
  description: string;
  tagline: string;
  location: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  organization: {
    name: string;
  };
}