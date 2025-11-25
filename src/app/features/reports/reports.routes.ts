import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

import { Reports } from "./reports";
import { LeadersAttendanceSummary } from "./pages/leaders-attendance-summary/leaders-attendance-summary";
import { CellMemberAttendanceSummary } from "./pages/cell-member-attendance-summary/cell-member-attendance-summary";
import { AttendanceSummaryByChurchProcess } from "./pages/attendance-summary-by-church-process/attendance-summary-by-church-process";
import { AttendanceSummaryByMemberStatus } from "./pages/attendance-summary-by-member-status/attendance-summary-by-member-status";

export const reportsRoutes: Routes = [
    {
        path: '',
        component: Reports,
        canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/member-status',
        component: AttendanceSummaryByMemberStatus,
        canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/church-process',
        component: AttendanceSummaryByChurchProcess,
        canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/leaders',
        component: LeadersAttendanceSummary,
        canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/leaders/:primaryLeaderId',
        component: CellMemberAttendanceSummary,
        canActivate: [authGuard],
    },
]