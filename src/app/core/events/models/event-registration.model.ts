import { LTHMIAttendeeProfile } from "../../attendees/models/lthmi-attendee-profile.model";

export interface EventRegistrationModel {
  id: string;
  eventId: string;
  attendeeId: string;
  invitedBy: string;
  createdAt: string;
  updatedAt: string;
  attendee: LTHMIAttendeeProfile;
}