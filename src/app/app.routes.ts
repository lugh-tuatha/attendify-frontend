import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { Login } from './features/auth/login/login';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('@/app/features/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'attendees',
        canActivate: [authGuard],
        loadChildren: () => 
            import('@/app/features/attendees/attendees.routes').then(m => m.AttendeesRoutes)
    },
    {
        path: 'attendance',
        canActivate: [authGuard],
        loadChildren: () =>
            import('@/app/features/attendance/attendance.routes').then(m => m.attendanceRoutes)
    },
    {
        path: 'events',
        canActivate: [authGuard],
        loadChildren: () =>
            import('@/app/features/events/events.routes').then(m => m.eventsRoutes)
    },
    {
        path: 'reports',    
        canActivate: [authGuard],
        loadChildren: () =>
            import('@/app/features/reports/reports.routes').then(m => m.reportsRoutes)
    }
];