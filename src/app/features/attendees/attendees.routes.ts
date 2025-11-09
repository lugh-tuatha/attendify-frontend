import { Routes } from "@angular/router";
import { authGuard } from "@/app/core/guards/auth.guard";

import { EnrollAttendee } from "./components/enroll-attendee/enroll-attendee";
import { Attendees } from "./attendees";

export const AttendeesRoutes: Routes = [
    {
        path: '',
        component: Attendees,
        canActivate: [authGuard],
    },
    {
        path: 'enroll',    
        component: EnrollAttendee,
        canActivate: [authGuard],
    },
]