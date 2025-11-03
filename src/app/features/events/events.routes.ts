import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

import { Events } from "./events";
import { EventManage } from "./pages/event-manage/event-manage";
import { EventRegistrations } from "./pages/event-registrations/event-registrations";

export const eventsRoutes: Routes = [
    {
        path: '',
        component: Events,
        canActivate: [authGuard],
    },
    {
        path: ':id/manage',    
        component: EventManage,
        canActivate: [authGuard],
    },
    {
        path: ':id/register',    
        component: EventRegistrations,
        canActivate: [authGuard],
    },
]