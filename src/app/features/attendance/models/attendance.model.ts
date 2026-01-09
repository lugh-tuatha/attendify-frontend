import { LTHMIAttendeeProfile } from "@/app/features/attendees/models/lthmi-attendee-profile.model";
import { EventRegistrationModel } from '@/app/features/events/models/event-registration.model';

export interface AttendanceModel {
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
  eventRegistration: EventRegistrationModel;
}