import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

import { Reports } from "./reports";
import { AttendanceSummary } from "./pages/attendance-summary/attendance-summary";
import { LeadersAttendanceSummary } from "./pages/leaders-attendance-summary/leaders-attendance-summary";
import { CellMemberAttendanceSummary } from "./pages/cell-member-attendance-summary/cell-member-attendance-summary";

export const reportsRoutes: Routes = [
    {
        path: '',
        component: Reports,
        // canActivate: [authGuard],
    },
    {
        path: 'attendance-summary',
        component: AttendanceSummary,
        // canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/leaders',
        component: LeadersAttendanceSummary,
        // canActivate: [authGuard],
    },
    {
        path: 'attendance-summary/leaders/:primaryLeaderId',
        component: CellMemberAttendanceSummary,
        // canActivate: [authGuard],
    },
]