import { AttendanceModel } from "./attendance.model";

export interface VipAttendanceModel {
  FIRST_TIMER: AttendanceModel[];
  SECOND_TIMER: AttendanceModel[];
  THIRD_TIMER: AttendanceModel[];
  FOURTH_TIMER: AttendanceModel[];
}