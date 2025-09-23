import { Routes } from '@angular/router';
import { Events } from './features/events/events';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { EventRegistration } from './features/events/pages/event-registration/event-registration';
import { EventsName } from './features/events/pages/events-name/events-name';

export const routes: Routes = [
    {
        path: 'events',
        component: Events
    },
    {
        path: 'events/event-name',
        component: EventsName
    },
    {
        path: 'events/event-name/event-registration',
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