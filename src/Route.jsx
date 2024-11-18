import { lazy } from 'react';

const routes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('./demos/ReactWindowInfiniteListWithWaypoint'))
  },
  {
    path: '/Popover',
    exact: true,
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
    path: '/Table3',
    component: lazy(() => import('./demos/Table3'))
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
  },
  {
    path: '/TextInput',
    component: lazy(() => import('./demos/TextInput'))
  },
  {
    path: '/TextAreaInput',
    component: lazy(() => import('./demos/TextAreaInput'))
  },
  {
    path: '/TagSelect1',
    component: lazy(() => import('./demos/TagSelect'))
  },
  {
    path: '/Dropdown',
    component: lazy(() => import('./demos/DropdownDemo'))
  },
  {
    path: '/Input',
    component: lazy(() => import('./demos/Input'))
  },
  {
    path: '/TagSelect',
    component: lazy(() => import('./demos/TagSelectDemo'))
  },
  {
    path: '/AddableTagSelect',
    component: lazy(() => import('./demos/AddableTagSelectDemo'))
  },
  {
    path: '/PinMode',
    component: lazy(() => import('./demos/PinModeDemo'))
  },
  {
    path: '/DisplayPathSelect',
    component: lazy(() => import('./demos/DisplayPathSelectDemo'))
  },
  {
    path: '/DragUpload',
    component: lazy(() => import('./demos/DragDropUploadFile'))
  },
  {
    path: '/IdeaImage',
    component: lazy(() => import('./demos/IdeaImage'))
  },
  {
    path: '/ImageUpload',
    component: lazy(() => import('./demos/ImageUpload'))
  },
  {
    path: '/Cropper',
    component: lazy(() => import('./demos/Cropper'))
  },
  {
    path: '/Cropperjs',
    component: lazy(() => import('./demos/Cropperjs'))
  },
  {
    path: '/vl',
    component: lazy(() => import('./demos/VirtualList'))
  },
  {
    path: '/vlist-self',
    component: lazy(() => import('./demos/VirtualListBySelf'))
  },
  {
    path: '/react-window',
    component: lazy(() => import('./demos/ReactWindow'))
  },
  {
    path: '/react-window-infinite',
    component: lazy(() => import('./demos/ReactWindowInfiniteList'))
  },
  {
    path: '/react-window-infinite-waypoint',
    component: lazy(() => import('./demos/ReactWindowInfiniteListWithWaypoint'))
  },
  {
    path: '/card-flip',
    component: lazy(() => import('./demos/CardFlip'))
  },
  {
    path: '/3dslide',
    component: lazy(() => import('./demos/TreeDcarousel'))
  },
  {
    path: '/cube',
    component: lazy(() => import('./demos/Cube'))
  },
  {
    path: '/3dhover',
    component: lazy(() => import('./demos/ThreeDHoverEffect'))
  },
  {
    path: '/mount-animation',
    component: lazy(() => import('./demos/MountAnimation'))
  },
  {
    path: '/scroll-indicator',
    component: lazy(() => import('./demos/ScrollIndicator'))
  },
  {
    path: '/scroll-driven-animation',
    component: lazy(() => import('./demos/ScrollDrivenAnimation'))
  },
  {
    path: '/use-reactive',
    component: lazy(() => import('./demos/UseReactiveDemo'))
  },
  {
    path: '/use-debounce',
    component: lazy(() => import('./demos/useDebouceDemo'))
  },
  {
    path: '/use-resize-observer',
    component: lazy(() => import('./demos/UseResizeObserverDemo'))
  },
  {
    path: '/use-tween',
    component: lazy(() => import('./demos/UseTweenDemo'))
  },
  {
    path: '/use-mount-animation',
    component: lazy(() => import('./demos/UseMountAnimationDemo'))
  },
  {
    path: '/use-undo',
    component: lazy(() => import('./demos/UseUndoDemo'))
  }
];

export default routes;
