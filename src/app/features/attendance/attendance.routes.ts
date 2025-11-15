import { Routes } from "@angular/router";

import { authGuard } from "@/app/core/guards/auth.guard";

import { Attendance } from "./attendance";
import { AttendanceDetail } from "./pages/attendance-detail/attendance-detail";
import { CheckIn } from "./pages/check-in/check-in";
import { AttendanceVip } from "./pages/attendance-vip/attendance-vip";

export const attendanceRoutes: Routes = [
    {
        path: '',
        component: Attendance,
        canActivate: [authGuard],
    },
    {
        path: ':slug',
        component: AttendanceDetail,
        canActivate: [authGuard],
    },
    {
        path: ':slug/check-in',
        component: CheckIn,
        canActivate: [authGuard],
    },
    {
        path: ':slug/vip/:date',
        component: AttendanceVip,
        canActivate: [authGuard],
    },
]