import { lazy } from 'react';

const routes = [
  {
    path: '/Popover',
    component: lazy(() => import('./demos/Popover'))
  },
  {
    path: '/Accordion',
    component: lazy(() => import('./demos/Accordion'))
  },
  {
    path: '/Table',
    component: lazy(() => import('./demos/Table'))
  },
  {
    path: '/Table1',
    component: lazy(() => import('./demos/Table1'))
  },
  {
    path: '/Table2',
    component: lazy(() => import('./demos/Table2'))
  },
  {
    path: '/Form',
    component: lazy(() => import('./demos/Form'))
  },
  {
    path: '/Image',
    component: lazy(() => import('./demos/Img'))
  },
  {
    path: '/Immer',
    component: lazy(() => import('./demos/ImmerJs'))
  },
  {
    path: '/ReduxHooks',
    component: lazy(() => import('./demos/ReduxHooks'))
  },
  {
    path: '/ReduxConnect',
    component: lazy(() => import('./demos/ReduxConnect'))
  },
  {
    path: '/ReactHookForm',
    component: lazy(() => import('./demos/ReactHookForm'))
  },
  {
    path: '/ReactHookFormWithDynamic',
    component: lazy(() => import('./demos/ReactHookFormWithDynamic'))
  },
  {
    path: '/TextArea',
    component: lazy(() => import('./demos/MyText'))
  }
];

export default routes;
