import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

import { Reports } from "./reports";
import { AttendanceSummaryReport } from "./pages/attendance-summary-report/attendance-summary-report";

export const reportsRoutes: Routes = [
    {
        path: '',
        component: Reports,
        canActivate: [authGuard],
    },
    {
        path: 'attendance-summary-report',
        component: AttendanceSummaryReport,
        canActivate: [authGuard],
    },
]