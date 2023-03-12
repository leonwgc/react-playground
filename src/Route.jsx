import {lazy} from 'react';

const routes = [
    {
        path: '/Popover',
        component: lazy(() => import('./demos/Popover'))
    }
];

export default routes;
