export interface DiscipleModel {
  firstName: string;
  lastName: string;
  attendance: {
    timeIn: Date;
    isLate: boolean;
  }[];
}

export interface AttendanceByPrimaryLeaderModel {
  primaryLeader: {
    firstName: string;
    lastName: string;
  } | null;
  disciples: DiscipleModel[];
}