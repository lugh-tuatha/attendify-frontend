import { Routes } from '@angular/router';
import { Events } from './features/events/events';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { FaceCheckIn } from './features/check-in/pages/face-check-in/face-check-in';
import { EventManage } from './features/events/pages/event-manage/event-manage';
import { EventRegistrations } from './features/events/pages/event-registrations/event-registrations';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'check-in/face',
        component: FaceCheckIn
    },
    {
        path: 'events',
        component: Events
    },
    {
        path: 'events/:id/manage',    
        component: EventManage
    },
    {
        path: 'events/:id/register',    
        component: EventRegistrations
    },
];