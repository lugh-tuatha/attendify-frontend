export interface LTHMIAttendeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  primaryLeader: string | null;
  churchProcess: string | null;
  memberStatus: string | null;
}