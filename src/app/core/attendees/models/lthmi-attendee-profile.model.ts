export interface LTHMIAttendeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  invitedBy: string;
  primaryLeader: {
    firstName: string;
    lastName: string;
  } | null;
  churchProcess: string | null;
  memberStatus: string | null;
}