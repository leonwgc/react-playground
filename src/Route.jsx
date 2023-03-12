import {lazy} from 'react';

const routes = [
    {
        path: '/Popover',
        component: lazy(() => import('./demos/Popover'))
    },
    {
        path: '/Accordion',
        component: lazy(() => import('./demos/Accordion'))
    }
];

export default routes;
