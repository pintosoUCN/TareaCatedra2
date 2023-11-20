import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'appointments',
    loadChildren: () =>
    import('../modules/appointment/appointment.module').then((m) => m.AppointmentModule),
    
  },
  {
    path: '',
    redirectTo: '/appointments',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
