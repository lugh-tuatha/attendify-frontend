import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { Events } from './features/events/events';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { EventManage } from './features/events/pages/event-manage/event-manage';
import { EventRegistrations } from './features/events/pages/event-registrations/event-registrations';
import { Attendance } from './features/attendance/attendance';
import { AttendanceDetail } from './features/attendance/pages/attendance-detail/attendance-detail';
import { CheckIn } from './features/attendance/pages/check-in/check-in';
import { Vip } from './features/attendance/pages/vip/vip';
import { Attendees } from './features/attendees/attendees';
import { Reports } from './features/reports/reports';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
    },
    {
        path: 'attendees',
        component: Attendees,
        canActivate: [authGuard],
    },
    {
        path: 'attendance',
        component: Attendance,
        canActivate: [authGuard],
    },
    {
        path: 'attendance/:slug',
        component: AttendanceDetail,
        canActivate: [authGuard],
    },
    {
        path: 'attendance/:slug/check-in',
        component: CheckIn,
        canActivate: [authGuard],
    },
    {
        path: 'attendance/:slug/vip',
        component: Vip,
        canActivate: [authGuard],
    },
    {
        path: 'events',
        component: Events,
        canActivate: [authGuard],
    },
    {
        path: 'events/:id/manage',    
        component: EventManage,
        canActivate: [authGuard],
    },
    {
        path: 'events/:id/register',    
        component: EventRegistrations,
        canActivate: [authGuard],
    },
    {
        path: 'reports',    
        component: Reports,
        canActivate: [authGuard],
    },
];