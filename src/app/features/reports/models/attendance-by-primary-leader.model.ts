import { ChurchProcessEnum } from "../../../core/enums/church-process.enum";
import { MemberStatusEnum } from "../../../core/enums/member-status.enum";
import { SummaryCategoryModel } from "./attendance-summary.model";

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

export interface SummaryModel {
  attendees: {
    total: number;
    categories: SummaryCategoryModel[];
  },
  vips: {
    total: number;
    categories: SummaryCategoryModel[];
  },
  totalDisciples: number;
  present: number;
  absent: number;
}

export interface AttendanceByPrimaryLeaderModel {
  primaryLeader: {
    firstName: string;
    lastName: string;
  } | null;
  disciples: DiscipleModel[];
  summary: SummaryModel;
}