import { Routes } from '@angular/router';
import { Events } from './features/events/events';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { EventRegistration } from './features/events/pages/event-registration/event-registration';
import { EventDetail } from './features/events/pages/event-detail/event-detail';

export const routes: Routes = [
    {
        path: 'events',
        component: Events
    },
    {
        path: 'events/:id',
        component: EventDetail
    },
    {
        path: 'events/:id/registration',    
        component: EventRegistration
    },

    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'login',
        component: Login
    }
];