import { ChurchProcessEnum } from "../../enums/church-process.enum";
import { MemberStatusEnum } from "../../enums/member-status.enum";

export interface DiscipleModel {
  firstName: string;
  lastName: string;
  memberStatus: MemberStatusEnum | null;
  churchProcess: ChurchProcessEnum | null;
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