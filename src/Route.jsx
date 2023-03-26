import { lazy } from 'react';

const routes = [
  {
    path: '/Popover',
    component: lazy(() => import('./demos/Popover')),
  },
  {
    path: '/Accordion',
    component: lazy(() => import('./demos/Accordion')),
  },
  {
    path: '/Table',
    component: lazy(() => import('./demos/Table')),
  },
  {
    path: '/Immer',
    component: lazy(() => import('./demos/ImmerJs')),
  },
  {
    path: '/ReduxToolKit',
    component: lazy(() => import('./demos/ReduxToolKit')),
  },
];

export default routes;
