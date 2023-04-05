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
    path: '/ReduxHooks',
    component: lazy(() => import('./demos/ReduxHooks')),
  },
  {
    path: '/ReduxConnect',
    component: lazy(() => import('./demos/ReduxConnect')),
  },
  {
    path: '/ReactHookForm',
    component: lazy(() => import('./demos/ReactHookForm')),
  },
];

export default routes;
